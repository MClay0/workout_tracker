import { useEffect, useState } from 'react';

interface Record {
  exercise: string;
  bestSet: string;
}

interface RecordsProps {
  username: string | null;
}

const fetchRecords = async (username: string): Promise<{ status: string; data: Record[] }> => {
  try {
    console.log(`🔍 Fetching records for username: ${username}`);
    const response = await fetch(`https://workouttracker.publicvm.com/records?username=${encodeURIComponent(username)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Server responded with an error: ${errorText}`);
      throw new Error(`Failed to fetch records: ${response.statusText}`);
    }

    const rawData = await response.json();
    console.log('✅ Fetched raw records:', rawData);

    // Transform the response into the expected format
    const transformedData: Record[] = rawData.data.map((item: { [key: string]: string }) => {
      const [exercise, bestSet] = Object.entries(item)[0]; // Extract the key-value pair
      return { exercise, bestSet };
    });

    console.log('✅ Transformed records:', transformedData);
    return { status: rawData.status, data: transformedData };
  } catch (error) {
    console.error('❌ Error fetching records:', error);
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
        setRecords(data.data); // Use the transformed data
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