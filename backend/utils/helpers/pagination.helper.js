class PaginationHelper {
  static createPaginationFilter(where, p_info) {
    const errorObj = [];

    const page = p_info.page ? +p_info.page : 1;
    const pageSize = p_info.pageSize ? +p_info.pageSize : 10;

    if (isNaN(page) || isNaN(pageSize) || page < 1 || pageSize < 1) {
      errorObj.push(`page and pageSize must be valid positive numbers!`);
    }

    if (errorObj.length) {
      return errorObj;
    }

    Object.keys(where).forEach((key) => {
      if (!where[key]) delete where[key];
    });

    const offset = (page - 1) * pageSize;

    return {
      offset,
      limit: pageSize,
      where,
      page,
    };
  }

  static prepareResponse(data, page, pageSize, totalItems) {
    const totalPages = Math.ceil(totalItems / pageSize);
    const currentPage = page;

    const metadata = {
      currentPage,
      totalPages,
      totalItems,
      limit: pageSize,
    };

    return {
      code: 200,
      status: "OK",
      metadata,
      data,
    };
  }
}

export  { PaginationHelper };
