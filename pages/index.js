export default function Home() {
  return (
    <main style={{ fontFamily: 'sans-serif', padding: '2rem', background: '#f9f9f9', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Finwise</h1>
      <form style={{ background: '#fff', padding: '1rem', borderRadius: '8px', maxWidth: '300px' }}>
        <input type="text" placeholder="نام" style={{ marginBottom: '1rem', width: '100%', padding: '0.5rem' }} />
        <input type="tel" placeholder="شماره موبایل" style={{ marginBottom: '1rem', width: '100%', padding: '0.5rem' }} />
        <button type="submit" style={{ width: '100%', padding: '0.5rem', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px' }}>
          ثبت‌نام
        </button>
      </form>
    </main>
  );
}
