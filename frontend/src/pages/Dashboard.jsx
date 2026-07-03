import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import JobCard from '../components/JobCard';
import AddJobModal from '../components/AddJobModal';
import api from '../api/axios';
import './Dashboard.css';

const STATUSES = [
  { key: 'applied', label: 'Applied', color: 'var(--applied)' },
  { key: 'interview', label: 'Interview', color: 'var(--interview)' },
  { key: 'offer', label: 'Offer', color: 'var(--offer)' },
  { key: 'rejected', label: 'Rejected', color: 'var(--rejected)' },
];

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/jobs?limit=100');
      setJobs(res.data.jobs);
    } catch (err) {
      setError('Could not load your applications.');
    } finally {
      setLoading(false);
    }
  };

  const handleJobAdded = () => {
    setShowModal(false);
    fetchJobs();
  };

  const jobsForStatus = (statusKey) => jobs.filter((job) => job.status === statusKey);

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Applications</h1>
          <button className="add-job-btn" onClick={() => setShowModal(true)}>+ Add job</button>
        </div>

        {error && <div className="dashboard-error">{error}</div>}

        {loading ? (
          <div className="dashboard-loading">Loading...</div>
        ) : (
          <div className="board">
            {STATUSES.map((status) => {
              const statusJobs = jobsForStatus(status.key);
              return (
                <div className="column" key={status.key}>
                  <div className="column-header">
                    <span className="column-dot" style={{ background: status.color }}></span>
                    <span className="column-title">{status.label}</span>
                    <span className="column-count">{statusJobs.length}</span>
                  </div>
                  {statusJobs.length === 0 ? (
                    <div className="column-empty">No applications yet</div>
                  ) : (
                    statusJobs.map((job) => <JobCard key={job._id} job={job} onUpdated={fetchJobs} />)
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showModal && (
        <AddJobModal onClose={() => setShowModal(false)} onJobAdded={handleJobAdded} />
      )}
    </div>
  );
}

export default Dashboard;