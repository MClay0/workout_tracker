import { useEffect, useState } from 'react';

interface Record {
  exercise: string;
  bestSet: string;
}

const Records: React.FC = () => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecords = async (username:string) => {
      try {
        const response = await fetch(`https://workouttracker.publicvm.com/records${encodeURIComponent(username)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch records');
        }

        const data = await response.json();
        setRecords(data.records); // Assuming the response has a `records` field
        setLoading(false);
      } catch (err) {
        console.error('Error fetching records:', err);
        setError('Failed to load records. Please try again later.');
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  if (loading) {
    return <p>Loading records...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Workout Records</h2>
      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <ul>
          {records.map((record, index) => (
            <li key={index}>
              <strong>{record.exercise}</strong>: {record.bestSet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Records;