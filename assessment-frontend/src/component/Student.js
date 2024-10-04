import { useEffect, useState } from "react";
import axios from 'axios';
import CommonPagination from "./CommonPagination";




function Student() {

  const [tableHead, setTableHead] = useState([]);
  const [students, setstudents] = useState([]);
  const [page, setpage] = useState(1);
  const [total, setTotal] = useState(0);
  const [file, setFile] = useState(null);
  const [tableData, setTableData] = useState([])
  const [message, setMessage] = useState('');

  useEffect(() => {
    Test();
  }, [page])

  useEffect(() => {
    const tabledd = students.map(item => {
      let mappedItem = {};
      tableHead.forEach(header => {
        mappedItem[header] = item[header];
      });
      return mappedItem;
    });

    console.log(tabledd)
  }, [tableHead])

  const selectArray = [
    { key: "school", value: ["StudentID", "school_name"] },
    { key: "classTable", value: ["StudentID", "Class"] },
    { key: "assessmentAreas", value: ["StudentID", "Assessment_Areas"] },
    { key: "awards", value: ["StudentID", "award"] },
    { key: "student", value: ["StudentID", "last_name"] },
    { key: "answers", value: ["StudentID", "Answers"] },
    { key: "subject", value: ["StudentID", "Subject", "Subject_Contents"] },
    {
      key: "summary", value: [
        "school_name",
        "sydney_participants",
        "sydney_percentile",
        "Assessment_Areas",
        "award",
        "Class",
        "correct_answer_percentage_per_class",
        "Correct_Answers",
        "StudentID",
        "participant",
        "student_score",
        "Subject",
        "Subject_Contents",
        "year_level",
        "Answers",
        "Question_Number"
      ]
    }
  ];



  function handleSelect(e) {
    console.log(e.target.value);
    setTableHead(selectArray.find(x => x.key === e.target.value).value);
    console.log(tableHead);
  }

  const handlecsvChange = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files[0])
    setFile(file);
  };


  async function Test() {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(`http://127.0.0.1:8000/booking?page=${page}&page_size=100`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.warn(response?.data?.message);
        setTotal(response?.data?.pagination?.total_pages)
        setstudents(response?.data?.message);
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }
  }



  return (
    <div>
      <h1>Student Details</h1>
      <div class="container mt-4" >
        <form>
          <form id="csv-upload-form">
            <div class="mb-3">
              <label for="csvFile" class="form-label">CSV file</label>
              <input type="file" accept=".csv" onChange={handlecsvChange} class="form-control" id="csvFile" name="file" required />
            </div>
            <button type="button" onClick={Test} class="btn btn-primary">Upload</button>
          </form>
        </form>
      </div>


      <div className={"container"}>
        <select className="form-select" aria-label="Default select example" onChange={handleSelect}>
          <option selected hidden>select</option>
          {selectArray.map((value, key) => <option value={value.key}>{value.key}</option>)}
        </select>
      </div>

      <div className="container mt-5 mb-5">
        <div className="table-responsive">

          <table class="table table-striped">
            <thead>
              <tr>
                {tableHead.map((value, key) => <th scope="col">{value}</th>)}
              </tr>
            </thead>
            <tbody>
              {students?.map((student, studentIndex) => (
                <tr key={studentIndex}>
                  {tableHead.map((key, index) => (
                    <td key={index}>{student[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>



      <CommonPagination pages={total} currentPage={page} setCurrentPage={setpage} />
    </div>
  );
}
export default Student;