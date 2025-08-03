import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JournalEntryList = ({ user, onEdit, refreshKey }) => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEntries = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:8081/api/journal/user/${user.sub || user.id}`);
            setEntries(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching journal entries:', error);
            setError('Failed to load journal entries. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchEntries();
        }
    }, [user, refreshKey]); // Added refreshKey to dependencies

    const handleDelete = async (entryId) => {
        if (window.confirm('Are you sure you want to delete this journal entry?')) {
            try {
                await axios.delete(`http://localhost:8081/api/journal/${entryId}`);
                setEntries(entries.filter(entry => entry.id !== entryId));
            } catch (error) {
                console.error('Error deleting journal entry:', error);
                alert('Failed to delete journal entry. Please try again.');
            }
        }
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleString();
    };

    const formatCurrency = (value) => {
        if (value === null || value === undefined) return 'N/A';
        return `$${parseFloat(value).toFixed(2)}`;
    };

    const getPnLColor = (pnl) => {
        if (pnl > 0) return '#28a745'; // Green
        if (pnl < 0) return '#dc3545'; // Red
        return '#6c757d'; // Gray
    };

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <div>Loading journal entries...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{
                backgroundColor: '#fee',
                color: '#c33',
                padding: '15px',
                borderRadius: '4px',
                margin: '20px 0',
                textAlign: 'center'
            }}>
                {error}
                <button
                    onClick={fetchEntries}
                    style={{
                        marginLeft: '10px',
                        padding: '5px 10px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '3px',
                        cursor: 'pointer'
                    }}
                >
                    Retry
                </button>
            </div>
        );
    }

    if (entries.length === 0) {
        return (
            <div style={{
                textAlign: 'center',
                padding: '40px',
                color: '#666'
            }}>
                <h3>No journal entries yet</h3>
                <p>Start tracking your trades by creating your first journal entry!</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{
                display: 'grid',
                gap: '15px',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'
            }}>
                {entries.map((entry) => (
                    <div
                        key={entry.id}
                        style={{
                            backgroundColor: 'white',
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '20px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            transition: 'box-shadow 0.2s'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '15px'
                        }}>
                            <h3 style={{
                                margin: 0,
                                color: '#333',
                                fontSize: '18px',
                                fontWeight: '600'
                            }}>
                                {entry.symbol}
                            </h3>
                            <div style={{
                                fontSize: '16px',
                                fontWeight: '600',
                                color: getPnLColor(entry.pnl)
                            }}>
                                {formatCurrency(entry.pnl)}
                            </div>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '10px',
                            fontSize: '14px',
                            marginBottom: '15px'
                        }}>
                            <div>
                                <strong>Entry:</strong> {formatCurrency(entry.entry)}
                            </div>
                            <div>
                                <strong>Exit:</strong> {formatCurrency(entry.exit)}
                            </div>
                            <div>
                                <strong>Size:</strong> {entry.positionSize}
                            </div>
                            <div>
                                <strong>Stop Loss:</strong> {formatCurrency(entry.stopLoss)}
                            </div>
                            <div>
                                <strong>Target:</strong> {formatCurrency(entry.target)}
                            </div>
                            <div>
                                <strong>Trailing:</strong> {formatCurrency(entry.trailingStop)}
                            </div>
                        </div>

                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>
                            <div><strong>Entry Time:</strong> {formatDateTime(entry.entryTime)}</div>
                            {entry.exitTime && (
                                <div><strong>Exit Time:</strong> {formatDateTime(entry.exitTime)}</div>
                            )}
                        </div>

                        {entry.setup && (
                            <div style={{
                                backgroundColor: '#f8f9fa',
                                padding: '10px',
                                borderRadius: '4px',
                                fontSize: '13px',
                                marginBottom: '15px',
                                color: '#555'
                            }}>
                                <strong>Setup:</strong> {entry.setup}
                            </div>
                        )}

                        <div style={{
                            display: 'flex',
                            gap: '10px',
                            justifyContent: 'flex-end'
                        }}>
                            <button
                                onClick={() => onEdit(entry)}
                                style={{
                                    padding: '6px 12px',
                                    fontSize: '12px',
                                    backgroundColor: '#17a2b8',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(entry.id)}
                                style={{
                                    padding: '6px 12px',
                                    fontSize: '12px',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JournalEntryList;
