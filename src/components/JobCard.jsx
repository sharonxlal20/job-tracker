import { useState } from 'react';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';
import ConfirmModal from './ConfirmModal';
import './JobCard.css';

const ROTATIONS = { applied: '-3deg', interview: '2deg', offer: '-2deg', rejected: '3deg' };
const COLORS = {
  applied: { border: 'var(--applied)', text: 'var(--applied-text)' },
  interview: { border: 'var(--interview)', text: 'var(--interview-text)' },
  offer: { border: 'var(--offer)', text: 'var(--offer-text)' },
  rejected: { border: 'var(--rejected)', text: 'var(--rejected-text)' },
};

function JobCard({ job, onUpdated }) {
  const [updating, setUpdating] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { showToast } = useToast();
  const colors = COLORS[job.status] || COLORS.applied;
  const rotation = ROTATIONS[job.status] || '0deg';

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setUpdating(true);
    try {
      await api.put(`/jobs/${job._id}`, { status: newStatus });
      showToast(`Moved to ${newStatus}`, 'success');
      onUpdated();
    } catch (err) {
      showToast('Could not update status. Try again.', 'error');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    setShowConfirm(false);
    try {
      await api.delete(`/jobs/${job._id}`);
      showToast('Application deleted', 'success');
      onUpdated();
    } catch (err) {
      showToast('Could not delete. Try again.', 'error');
    }
  };

  return (
    <>
      <div className="job-card">
        <div className="job-card-top">
          <div>
            <div className="job-card-company">{job.company}</div>
            <div className="job-card-position">{job.position}</div>
          </div>
          <button className="job-card-delete" onClick={() => setShowConfirm(true)} title="Delete">&times;</button>
        </div>

        <div
          className="job-card-stamp"
          style={{
            borderColor: colors.border,
            color: colors.text,
            transform: `rotate(${rotation})`,
          }}
        >
          {job.status}
        </div>

        <select
          className="job-card-status-select"
          value={job.status}
          onChange={handleStatusChange}
          disabled={updating}
        >
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {showConfirm && (
        <ConfirmModal
          title="Delete application?"
          message={`This will permanently remove your ${job.position} application at ${job.company}.`}
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}

export default JobCard;