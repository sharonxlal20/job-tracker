import { useState } from 'react';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';
import './AddJobModal.css';

function AddJobModal({ onClose, onJobAdded }) {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('applied');
  const [jobType, setJobType] = useState('full-time');
  const [jobLocation, setJobLocation] = useState('remote');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/jobs', { company, position, status, jobType, jobLocation });
      showToast('Application added', 'success');
      onJobAdded();
    } catch (err) {
      setError(err.response?.data?.error || 'Could not add job. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Add application</span>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="company">Company</label>
            <input id="company" type="text" value={company} onChange={(e) => setCompany(e.target.value)} required />
          </div>
          <div className="auth-field">
            <label htmlFor="position">Position</label>
            <input id="position" type="text" value={position} onChange={(e) => setPosition(e.target.value)} required />
          </div>
          <div className="modal-row">
            <div className="auth-field">
              <label htmlFor="status">Status</label>
              <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="auth-field">
              <label htmlFor="jobType">Job type</label>
              <select id="jobType" value={jobType} onChange={(e) => setJobType(e.target.value)}>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="internship">Internship</option>
                <option value="contract">Contract</option>
              </select>
            </div>
          </div>
          <div className="auth-field">
            <label htmlFor="jobLocation">Location</label>
            <input id="jobLocation" type="text" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} />
          </div>
          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add application'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddJobModal;