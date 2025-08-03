import React, { useState } from 'react';

const EntryForm: React.FC<{ onAddEntry: (date: string, text: string) => void }> = ({ onAddEntry }) => {
    const [date, setDate] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onAddEntry(date, text);
        setDate('');
        setText('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Date:</label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Entry:</label>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Entry</button>
        </form>
    );
};

export default EntryForm;