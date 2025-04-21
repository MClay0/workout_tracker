import { useEffect, useState } from 'react';

interface Record {
  exercise: string;
  bestSet: string;
}

interface RecordsProps {
  username: string | null;
}

const fetchRecords = async (username: string) => {
  try {
    const response = await fetch(`https://workouttracker.publicvm.com/records?username=${encodeURIComponent(username)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch records');
    }

    const data = await response.json();
    console.log('Fetched records:', data);
    return data;
  } catch (error) {
    console.error('Error fetching records:', error);
    throw error;
  }
};

const Records: React.FC<RecordsProps> = ({ username }) => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecords = async () => {
      if (!username) {
        setError('No username provided.');
        setLoading(false);
        return;
      }

      try {
        const data = await fetchRecords(username);
        setRecords(data.data); // Assuming the response has a `data` field
        setLoading(false);
      } catch (err) {
        setError('Failed to load records. Please try again later.');
        setLoading(false);
      }
    };

    loadRecords();
  }, [username]);

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