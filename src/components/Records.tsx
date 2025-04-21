import { useEffect, useState } from 'react';

interface Record {
  exercise: string;
  bestSet: string;
}

interface RecordsProps {
  username: string | null;
}

const Records: React.FC<RecordsProps> = ({ username }) => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      if (!username) {
        setError('No username provided.');
        setLoading(false);
        return;
      }

      try {
        let url = "https://workouttracker.publicvm.com/records?username=" + username;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Response:', response);
        if (!response.ok) {
          throw new Error('Failed to fetch records');
        }

        const data = await response.json();
        console.log('Fetched records:', data);
        setRecords(data.data); // Assuming the response has a `data` field
        setLoading(false);
      } catch (err) {
        console.error('Error fetching records:', err);
        
        setError('Failed to load records. Please try again later.');
        setLoading(false);
      }
    };

    fetchRecords();
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