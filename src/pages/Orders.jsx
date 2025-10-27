import React, { useEffect, useState } from "react";
import { Filter, Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState("All")
  const { myOrders } = useSelector(state => state.order)
  const dispatch = useDispatch()

  useEffect(() => {
    // dispatch
  }, [])

  const filterOrder = myOrders.filter(order => statusFilter === "All" || order.order_status === statusFilter)

  const getStatusIcon = (status) => {

    switch (status) {
      case "Processing":
        return <Package className="w-5 h-5 text-yellow-500" />

      case "Shipped":
        return <Truck className="w-5 h-5 text-blue-500" />

      case "Delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />

      case "Cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />

      default:
        return <Package className="w-5 h-5 text-yellow-500" />
    }
  }

  const getStatusColor = (status) => {

    switch (status) {
      case "Processing":
        return "bg-yellow-500/20 text-yellow-400"

      case "Shipped":
        return "bg-blue-500/20 text-blue-400"

      case "Delivered":
        return "bg-green-500/20 text-green-400"

      case "Cancelled":
        return "bg-red-500/20 text-red-400"

      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const statusArray = ["All", "Processing", "Shipped", "Delivered", "Cancelled"]

  const { authUser } = useSelector(state => state.auth)
  const navigateTo = useNavigate()
  if (!authUser) return navigateTo("/products")

  return <>
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
          <p className="text-muted-foreground">Track and manage your order history.</p>
        </div>

        {/* status filter */}
        <div className="glass-card p-4 mb-8">
          <div className="flex items-center space-x-4 flex-wrap">
            <div className="flex item-center space-x-2">
              <Filter className="w-5 h-5 text-primary" />
              <span className="font-medium">Filter by status: </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {
                statusArray.map(status => {
                  return (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${statusFilter === status ? "gradient-primary text-primary-foreground" : "glass-card hover:glow-on-hover text-foreground"}`}
                    >
                      {status}
                    </button>
                  )
                })
              }
            </div>
          </div>
        </div>

      </div>
    </div>
  </>;
};

export default Orders;
