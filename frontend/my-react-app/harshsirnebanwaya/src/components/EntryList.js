import React from 'react';
import { Entry } from '../types/Entry';

interface EntryListProps {
  entries: Entry[];
}

const EntryList: React.FC<EntryListProps> = ({ entries }) => {
  return (
    <div>
      <h2>Journal Entries</h2>
      <ul>
        {entries.map((entry, index) => (
          <li key={index}>
            <strong>{entry.date}</strong>: {entry.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntryList;