import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';

function MarkAttendance() {
    const location = useLocation();
    const { courseId, professorId, activeFrom, activeTill } = location.state || {};
    const [isActive, setIsActive] = useState(false);
    
    // Create state object and encode it
    const stateData = {
        courseId,
        professorId,
        activeFrom,
        activeTill
    };
    
    // Create URL with encoded state
    const formUrl = `${window.location.origin}/student/markattendance#${btoa(JSON.stringify(stateData))}`;

    useEffect(() => {
        // Check if QR code should be active
        const checkActive = () => {
            const now = new Date().getTime();
            const start = new Date(activeFrom).getTime();
            const end = new Date(activeTill).getTime();
            setIsActive(now >= start && now <= end);
        };

        // Initial check
        checkActive();

        // Set up interval to check every second
        const interval = setInterval(checkActive, 1000);

        // Cleanup interval
        return () => clearInterval(interval);
    }, [courseId, professorId, activeFrom, activeTill]);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Mark Attendance</h2>
            <div className="card">
                <div className="card-body">
                    <div className="text-center mt-4">
                        <div>
                            <div className={`alert ${isActive ? 'alert-success' : 'alert-warning'} mb-3`}>
                                Status: {isActive ? 'Active' : 'Inactive'}
                            </div>
                            <div style={{ background: 'white', padding: '20px', display: 'inline-block' }}>
                                <QRCodeSVG
                                    value={formUrl}
                                    size={256}
                                    level="H"
                                    includeMargin={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MarkAttendance;
