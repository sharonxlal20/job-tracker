import { useState } from 'react';
import api from '../api/axios';
import { useToast } from '../context/ToastContext';
import ConfirmModal from './ConfirmModal';
import EditJobModal from './EditJobModal';
import './JobCard.css';

const ROTATIONS = { applied: '-3deg', interview: '2deg', offer: '-2deg', rejected: '3deg' };
const COLORS = {
  applied: { border: 'var(--applied)', text: 'var(--applied-text)' },
  interview: { border: 'var(--interview)', text: 'var(--interview-text)' },
  offer: { border: 'var(--offer)', text: 'var(--offer-text)' },
  rejected: { border: 'var(--rejected)', text: 'var(--rejected-text)' },
};

function EditIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function JobCard({ job, onUpdated }) {
  const [updating, setUpdating] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
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

  const handleJobUpdated = () => {
    setShowEdit(false);
    onUpdated();
  };

  return (
    <>
      <div className="job-card">
        <div className="job-card-top">
          <div>
            <div className="job-card-company">{job.company}</div>
            <div className="job-card-position">{job.position}</div>
          </div>
          <div className="job-card-actions">
            <button className="job-card-edit" onClick={() => setShowEdit(true)} title="Edit">
              <EditIcon />
            </button>
            <button className="job-card-delete" onClick={() => setShowConfirm(true)} title="Delete">&times;</button>
          </div>
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

      {showEdit && (
        <EditJobModal
          job={job}
          onClose={() => setShowEdit(false)}
          onJobUpdated={handleJobUpdated}
        />
      )}
    </>
  );
}

export default JobCard;