import React, { useState } from 'react';
import axios from 'axios';

const JournalEntryForm = ({ user, onSave, onCancel, editEntry = null }) => {
    const [formData, setFormData] = useState({
        entryTime: editEntry?.entryTime || new Date().toISOString().slice(0, 16),
        symbol: editEntry?.symbol || '',
        entry: editEntry?.entry || '',
        stopLoss: editEntry?.stopLoss || '',
        positionSize: editEntry?.positionSize || '',
        target: editEntry?.target || '',
        trailingStop: editEntry?.trailingStop || '',
        exitTime: editEntry?.exitTime || '',
        exit: editEntry?.exit || '',
        pnl: editEntry?.pnl || '',
        setup: editEntry?.setup || ''
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const dataToSubmit = {
                ...formData,
                userId: user.sub || user.id,
                entry: parseFloat(formData.entry) || 0,
                stopLoss: parseFloat(formData.stopLoss) || 0,
                positionSize: parseFloat(formData.positionSize) || 0,
                target: parseFloat(formData.target) || 0,
                trailingStop: parseFloat(formData.trailingStop) || 0,
                exit: parseFloat(formData.exit) || 0,
                pnl: parseFloat(formData.pnl) || 0,
                entryTime: formData.entryTime,
                exitTime: formData.exitTime || null
            };

            let response;
            if (editEntry) {
                // Update existing entry
                response = await axios.put(`http://localhost:8081/api/journal/${editEntry.id}`, dataToSubmit);
            } else {
                // Create new entry
                response = await axios.post('http://localhost:8081/api/journal', dataToSubmit);
            }

            console.log('Journal entry saved:', response.data);
            onSave(response.data);
        } catch (error) {
            console.error('Error saving journal entry:', error);
            setError(error.response?.data?.message || 'Failed to save journal entry. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '14px',
        boxSizing: 'border-box'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '5px',
        fontWeight: '500',
        color: '#333'
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '30px',
                maxWidth: '600px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
            }}>
                <h2 style={{ marginBottom: '20px', color: '#333' }}>
                    {editEntry ? 'Edit Journal Entry' : 'New Journal Entry'}
                </h2>

                {error && (
                    <div style={{
                        backgroundColor: '#fee',
                        color: '#c33',
                        padding: '10px',
                        borderRadius: '4px',
                        marginBottom: '20px',
                        fontSize: '14px'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div>
                            <label style={labelStyle}>Entry Time*</label>
                            <input
                                type="datetime-local"
                                name="entryTime"
                                value={formData.entryTime}
                                onChange={handleChange}
                                style={inputStyle}
                                required
                            />
                        </div>
                        
                        <div>
                            <label style={labelStyle}>Symbol*</label>
                            <input
                                type="text"
                                name="symbol"
                                value={formData.symbol}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="e.g., AAPL, MSFT"
                                required
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>Entry Price*</label>
                            <input
                                type="number"
                                step="0.01"
                                name="entry"
                                value={formData.entry}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="0.00"
                                required
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>Stop Loss</label>
                            <input
                                type="number"
                                step="0.01"
                                name="stopLoss"
                                value={formData.stopLoss}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>Position Size*</label>
                            <input
                                type="number"
                                step="0.01"
                                name="positionSize"
                                value={formData.positionSize}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="100"
                                required
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>Target Price</label>
                            <input
                                type="number"
                                step="0.01"
                                name="target"
                                value={formData.target}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>Trailing Stop</label>
                            <input
                                type="number"
                                step="0.01"
                                name="trailingStop"
                                value={formData.trailingStop}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>Exit Time</label>
                            <input
                                type="datetime-local"
                                name="exitTime"
                                value={formData.exitTime}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>Exit Price</label>
                            <input
                                type="number"
                                step="0.01"
                                name="exit"
                                value={formData.exit}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>P&L</label>
                            <input
                                type="number"
                                step="0.01"
                                name="pnl"
                                value={formData.pnl}
                                onChange={handleChange}
                                style={inputStyle}
                                placeholder="0.00"
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '15px' }}>
                        <label style={labelStyle}>Setup/Notes</label>
                        <textarea
                            name="setup"
                            value={formData.setup}
                            onChange={handleChange}
                            style={{
                                ...inputStyle,
                                height: '80px',
                                resize: 'vertical'
                            }}
                            placeholder="Describe your trading setup, strategy, or notes..."
                        />
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'flex-end',
                        marginTop: '20px'
                    }}>
                        <button
                            type="button"
                            onClick={onCancel}
                            style={{
                                padding: '10px 20px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                backgroundColor: 'white',
                                color: '#333',
                                cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            style={{
                                padding: '10px 20px',
                                border: 'none',
                                borderRadius: '4px',
                                backgroundColor: isLoading ? '#ccc' : '#4285f4',
                                color: 'white',
                                cursor: isLoading ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isLoading ? 'Saving...' : (editEntry ? 'Update' : 'Save')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JournalEntryForm;
