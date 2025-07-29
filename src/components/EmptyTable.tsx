function EmptyTable() {
  return (
    <table
      style={{
        width: "100%",
        margin: "0 auto",
        border: "1px solid #ccc",
        padding: "20px",
      }}
    >
      <thead>
        <tr>
          <th style={{ width: "100%" }}>No Todos Available</th>
        </tr>
      </thead>
      <tbody style={{ textAlign: "center" }}>
        <tr>
          <td>Please add some todos to get started!</td>
        </tr>
      </tbody>
    </table>
  );
}

export default EmptyTable;
