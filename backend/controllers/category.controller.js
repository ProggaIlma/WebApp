import Category from '../models/Category.model.js';
import { PaginationHelper } from "../utils/helpers/pagination.helper.js";

// CREATE
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(409).json({ error: 'Category already exists' });
    }

    const category = await Category.create({ name, description });
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    console.error('Create Category Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};



export const getAllCategories = async (req, res) => {
  try {
    const p_info = {
      page: req.query.page,
      pageSize: req.query.limit || req.query.pageSize, // support both terms
    };

    const filter = {}; // You can add search filters here later

    const pagination = PaginationHelper.createPaginationFilter(filter, p_info);

    if (Array.isArray(pagination)) {
      return res.status(400).json({
        code: 400,
        status: 'BAD_REQUEST',
        errors: pagination,
      });
    }

    const { offset, limit, where, page } = pagination;

    const [categories, total] = await Promise.all([
      Category.find(where).sort({ createdAt: -1 }).skip(offset).limit(limit),
      Category.countDocuments(where),
    ]);

    const response = PaginationHelper.prepareResponse(categories, page, limit, total);

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({
      code: 500,
      status: 'INTERNAL_SERVER_ERROR',
      error: 'Failed to fetch categories',
    });
  }
};


// READ SINGLE
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error('Get Category Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// UPDATE
export const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    console.error('Update Category Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete Category Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
