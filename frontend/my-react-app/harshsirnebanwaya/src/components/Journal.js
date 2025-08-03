import React, { useState } from 'react';
import JournalEntryForm from './JournalEntryForm';
import JournalEntryList from './JournalEntryList';

const Journal = ({ user, onLogout }) => {
    const [showForm, setShowForm] = useState(false);
    const [editEntry, setEditEntry] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSave = (savedEntry) => {
        console.log('Entry saved:', savedEntry);
        setShowForm(false);
        setEditEntry(null);
        // Trigger refresh of the list
        setRefreshKey(prev => prev + 1);
    };

    const handleEdit = (entry) => {
        setEditEntry(entry);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditEntry(null);
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
            fontFamily: 'Arial, sans-serif'
        }}>
            {/* Header */}
            <div style={{
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                padding: '15px 30px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <h1 style={{ margin: 0, color: '#333', fontSize: '24px' }}>
                        Trading Journal
                    </h1>
                    {user?.picture && (
                        <img 
                            src={user.picture} 
                            alt="Profile" 
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                border: '2px solid #4285f4'
                            }}
                        />
                    )}
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
                            {user?.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                            {user?.email}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button
                        onClick={() => setShowForm(true)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#4285f4',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        <span style={{ fontSize: '16px' }}>+</span>
                        New Entry
                    </button>
                    
                    <button
                        onClick={onLogout}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: '20px 30px' }}>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        padding: '20px 30px',
                        borderBottom: '1px solid #eee',
                        backgroundColor: '#f8f9fa'
                    }}>
                        <h2 style={{ margin: 0, color: '#333', fontSize: '18px' }}>
                            Your Trading Entries
                        </h2>
                        <p style={{ margin: '5px 0 0 0', color: '#666', fontSize: '14px' }}>
                            Track your trades, analyze performance, and improve your strategy
                        </p>
                    </div>
                    
                    <JournalEntryList 
                        user={user} 
                        onEdit={handleEdit}
                        refreshKey={refreshKey}
                    />
                </div>
            </div>

            {/* Form Modal */}
            {showForm && (
                <JournalEntryForm
                    user={user}
                    onSave={handleSave}
                    onCancel={handleCancel}
                    editEntry={editEntry}
                />
            )}
        </div>
    );
};

export default Journal;
