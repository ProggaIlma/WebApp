'use client';

import * as React from 'react';
import { Fragment } from 'react';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import Description from './description';
import Orders from './order/orders';
import Review from './review';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ReviewsIcon from '@mui/icons-material/Reviews';

export default function AccountInfoTabs() {
  const [value, setValue] = React.useState('DESCRIPTION');

  return (
    <Grid container spacing={3} className='mt-8 ml-3'>
      <Grid size={{ xs: 12, md: 2 }} className="flex flex-col mb-8">
        <input type="radio" id="desc" name="fav_desc" value="HTML" style={{ display: 'none' }} />
        <label
          className="flex  items-center "
          htmlFor="desc"
          style={value == 'DESCRIPTION' ? styles.selected : styles.not_selected}
          onClick={() => {
            setValue('DESCRIPTION');
          }}
        >
          <AccountBoxIcon className="mr-2 mt-1" />
          <Typography className="font-bold">MY PROFILE</Typography>
        </label>
        <br />

        <input type="radio" id="use" name="fav_use" value="HTML" style={{ display: 'none' }} />
        <label className="flex  items-center " htmlFor="use" style={value == 'HOW TO USE' ? styles.selected : styles.not_selected} onClick={() => setValue('HOW TO USE')}>
          <ChromeReaderModeIcon className="mr-2 mt-1" />
          <Typography className="font-bold">MY ORDERS</Typography>
        </label>
        <br />

        <input type="radio" id="faq" name="fav_faq" value="HTML" style={{ display: 'none' }} />
        <label className="flex  items-center" htmlFor="faq" style={value == 'FAQ' ? styles.selected : styles.not_selected} onClick={() => setValue('FAQ')}>
          <LibraryBooksIcon className="mr-2 mt-1" />
          <Typography className="font-bold">ADDRESS BOOK</Typography>
        </label>
        <br />

        <input type="radio" id="reviews" name="fav_reviews" value="HTML" style={{ display: 'none' }} />
        <label className="flex  items-center" htmlFor="reviews" style={value == 'REVIEWS' ? styles.selected : styles.not_selected} onClick={() => setValue('REVIEWS')}>
          <ReviewsIcon className="mr-2 mt-1" />
          <Typography className="font-bold">MY REVIEWS</Typography>
        </label>
        <br />
      </Grid>

      <Grid size={{ xs: 12, md: 10 }} className='bg-white rounded-xl p-4'>
        {value == 'DESCRIPTION' && <Orders />}
        {value == 'HOW TO USE' && <Description />}
        {value == 'FAQ' && <Description />}
        {value == 'REVIEWS' && <Review />}
        {value == 'Q&A' && <Description />}
      </Grid>
    </Grid>
  );
}
const styles = {
  selected: {
    color: '#44776d',

    marginRight: '5px',

    cursor: 'pointer',

    textAlign: 'center',
  },
  not_selected: {
    color: '#6b7080',

    marginRight: '5px',
    cursor: 'pointer',

    textAlign: 'center',
  },
};
