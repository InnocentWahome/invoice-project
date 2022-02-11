import React, { useState, useEffect } from "react"
import { DataGrid } from "@mui/x-data-grid"
import EmployeeLayout from "../../layouts/EmployeeLayout"
import $http from "../../plugins/axios"
import StockForm from "../../components/forms/StockForm"

const AdminInventory = () => {
  const columns = [
    // { field: "id", headerName: "ID" },
    { field: "product_id", headerName: "Product ID", width: 200 },
    { field: "product_name", headerName: "Product Name", width: 200 },
    { field: "user_id", headerName: "User ID", width: 200 },
    { field: "cost", headerName: "Cost(KSH)", width: 200 },
    { field: "quantity", headerName: "Product Quantity", width: 200 },
    { field: "admin_approval", headerName: "Admin Approval", width: 200 },
    { field: "dispatch_status", headerName: "Dispatch Status", width: 200 },
    { field: "delivery_status", headerName: "Delivery Status", width: 200 },
  ]
  const [tableData, setTableData] = useState([])
  const [pageSize, setPageSize] = React.useState(25)

  const fetchUsers = async e => {
    try {
      const response = await $http.Api({
        method: "GET",
        url: "/order",
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
    <EmployeeLayout>
      <div className="container pt-6">
        {/* <div class="columns">
          <div class="column is-two-thirds"> */}
            <p class="is-size-4 has-text-centered pb-3 title">
              All Orders Are Listed Here
            </p>
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
          {/* <div class="column pt-6 mt-6">
            <StockForm />
          </div> */}
        {/* </div>
      </div> */}
    </EmployeeLayout>
  )
}

export default AdminInventory
