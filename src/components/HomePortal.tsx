function HomePortal() {
  const testStyle = { padding: 10, textDecoration: 'underline', fontWeight: 'bold' };
  return (
    <div>
      HomePortal
      <p style={testStyle} onClick={() => {}}>
        항공안전으로 이동
      </p>
      <p style={testStyle} onClick={() => {}}>
        산업안전으로 이동
      </p>
    </div>
  );
}

export default HomePortal;
