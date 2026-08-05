import React, { useState } from 'react';
import news from '../data/news.json';
import { Md } from './Md';

const VISIBLE = 6;

export default function News() {
  const [all, setAll] = useState(false);
  const shown = all ? news : news.slice(0, VISIBLE);
  return (
    <section id="news" className="sec">
      <h2 className="sec-head">News &amp; Activities</h2>
      <div className="newsgrid">
        {shown.map((n, i) => (
          <React.Fragment key={i}>
            <span className="nd">{n.date}</span>
            <span className="nt"><Md s={n.text} /></span>
          </React.Fragment>
        ))}
      </div>
      {news.length > VISIBLE && (
        <button className="morebtn" onClick={() => setAll(a => !a)}>
          {all ? '− show recent only' : `+ show all (${news.length})`}
        </button>
      )}
    </section>
  );
}
