'use client';

import * as React from 'react';
import { Fragment } from 'react';
import { Typography } from '@mui/material';
import Description from './description';
import Review from './review';

export default function ProductTabs() {
  const [value, setValue] = React.useState('DESCRIPTION');

  return (
    <Fragment>
      <div className="flex justify-center items-center w-full mb-8 flex-wrap">
        <input type="radio" id="desc" name="fav_desc" value="HTML" style={{ display: 'none' }} />
        <label
          htmlFor="desc"
          style={value == 'DESCRIPTION' ? styles.selected : styles.not_selected}
          onClick={() => {
            setValue('DESCRIPTION');
          }}
        >
          <Typography>DESCRIPTION</Typography>
        </label>
        <br /><br />

        <input type="radio" id="use" name="fav_use" value="HTML" style={{ display: 'none' }} />
        <label htmlFor="use" style={value == 'HOW TO USE' ? styles.selected : styles.not_selected} onClick={() => setValue('HOW TO USE')}>
          <Typography component='div' className='flex flex-wrap'>HOW TO USE</Typography>
        </label>
        <br />

        <input type="radio" id="faq" name="fav_faq" value="HTML" style={{ display: 'none' }} />
        <label htmlFor="faq" style={value == 'FAQ' ? styles.selected : styles.not_selected} onClick={() => setValue('FAQ')}>
          <Typography>FAQ</Typography>
        </label>
        <br />

        <input type="radio" id="reviews" name="fav_reviews" value="HTML" style={{ display: 'none' }} />
        <label htmlFor="reviews" style={value == 'REVIEWS' ? styles.selected : styles.not_selected} onClick={() => setValue('REVIEWS')}>
          <Typography>REVIEWS</Typography>
        </label>
        <br />

        <input type="radio" id="qa" name="fav_qa" value="HTML" style={{ display: 'none' }} />
        <label htmlFor="qa" style={value == 'Q&A' ? styles.selected : styles.not_selected} onClick={() => setValue('Q&A')}>
          <Typography>Q&A</Typography>
        </label>
        <br />
      </div>

      <div>
        {value == 'DESCRIPTION' && <Description />}
        {value == 'HOW TO USE' && <Description />}
        {value == 'FAQ' && <Description />}
        {value == 'REVIEWS' && <Review />}
        {value == 'Q&A' && <Description />}
      </div>
    </Fragment>
  );
}
const styles = {
  selected: {
    backgroundColor: '#44776d',
    color: 'white',
    padding: '12px',
    marginRight: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    width: 'max-content',
    textAlign: 'center',marginBottom:"8px"
  },
  not_selected: {
    backgroundColor: '#e5e7eb',
    color: '#6b7080',
    padding: '12px',
    borderRadius: '8px',
    marginRight: '12px',
    cursor: 'pointer',
    width: 'max-content',
    textAlign: 'center',marginBottom:"8px"
  },
};
