import React, { useState, useEffect } from "react"
import { DataGrid } from "@mui/x-data-grid"
import AdminLayout from "../../layouts/AdminLayout"
import $http from "../../plugins/axios"

const AdminEmployeePerformance = () => {
  const columns = [
    { field: "date", headerName: "Date", width: 200 },
    { field: "day", headerName: "Day", width: 200 },
    { field: "start", headerName: "Start Time", width: 200 },
    { field: "stop", headerName: "Stop Time", width: 200 },
    { field: "hours", headerName: "Hours Worked", width: 200 },
    { field: "user_id", headerName: "Employee ID", width: 200 },
  ]
  const [tableData, setTableData] = useState([])
  const [pageSize, setPageSize] = React.useState(25)

  const fetchUsers = async e => {
    try {
      const response = await $http.Api({
        method: "GET",
        url: "/worklog",
      })
      if (response.data?.data) {
        console.log(tableData)
        setTableData(response.data.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <AdminLayout>
      <div className="container pt-6">
        <p class="is-size-4 has-text-centered pb-3">Employee Work Logs</p>
        <div style={{ height: 700, width: "200" }}>
          <DataGrid
            rows={tableData}
            pageSize={pageSize}
            onPageSizeChange={newPage => setPageSize(newPage)}
            pagination
            columns={columns}
            // checkboxSelection
          />
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminEmployeePerformance
