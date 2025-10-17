export default function Dashboard() {
  const data = {
    income: 1200000,
    expense: 850000,
    savings: 350000,
  };

  return (
    <main style={{ padding: '2rem', background: '#f0f4f8', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>داشبورد مالی</h1>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', flex: '1' }}>
          <h2>درآمد</h2>
          <p style={{ color: 'green', fontSize: '1.2rem' }}>{data.income.toLocaleString()} تومان</p>
        </div>
        <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', flex: '1' }}>
          <h2>هزینه</h2>
          <p style={{ color: 'red', fontSize: '1.2rem' }}>{data.expense.toLocaleString()} تومان</p>
        </div>
        <div style={{ background: '#fff', padding: '1rem', borderRadius: '8px', flex: '1' }}>
          <h2>پس‌انداز</h2>
          <p style={{ color: 'blue', fontSize: '1.2rem' }}>{data.savings.toLocaleString()} تومان</p>
        </div>
      </div>
    </main>
  );
}
