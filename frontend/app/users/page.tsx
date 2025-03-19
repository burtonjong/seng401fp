export default async function Users() {
  const response = await fetch("http://localhost:8080/api/stories/user", {
    method: "GET",
  });

  if (!response.ok) {
    return <p>Error occured fetching user data</p>;
  }

  const user = await response.json();
  return (
    <div>
      <h2>User Data:</h2>
      <pre>{JSON.stringify(user, null, 2)}</pre>  {}
    </div>
  );
}