const MyLink = () => {
  return (
    <a href="https://github.com/anhquan-pham" target="_blank">
      GitHub Profile
    </a>
  );
};

export default function StudentInfo() {
  return (
    <main>
      <h1>Anh Quan Pham</h1>
      <MyLink />
    </main>
  );
}
