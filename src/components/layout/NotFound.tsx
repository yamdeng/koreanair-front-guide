function NotFound() {
  const goHome = () => {};
  return (
    <div>
      <h3>존재하지 않은 페이지입니다.</h3>
      <p>
        <button onClick={goHome}>홈으로</button>
      </p>
    </div>
  );
}
export default NotFound;
