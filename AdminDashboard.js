import React, { useState, useEffect } from 'react';
// ચાર્ટ માટે જરૂરી કમ્પોનન્ટ્સ ઈમ્પોર્ટ કરો
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// ChartJS ને રજિસ્ટર કરવું ફરજિયાત છે
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [data, setData] = useState({
    totalSales: 0,
    totalUsers: 0,
    pendingOrders: 0,
    outOfStock: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/orders/admin/stats');
      const result = await res.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const formatINR = (num) => new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0
  }).format(num);

  const stats = [
    { label: 'TOTAL REVENUE', val: formatINR(data.totalSales), color: 'success', icon: '💰' },
    { label: 'ACTIVE USERS', val: data.totalUsers, color: 'primary', icon: '👥' },
    { label: 'PENDING ORDERS', val: data.pendingOrders, color: 'warning', icon: '⏳' },
    { label: 'OUT OF STOCK', val: data.outOfStock + ' Items', color: 'danger', icon: '🚫' }
  ];

  // --- ચાર્ટ માટેનો ડેટા અને કોન્ફિગરેશન (તમારો નવો ચાર્ટ અહીં છે) ---
  
  // આ અત્યારે ડમી ડેટા છે, ભવિષ્યમાં તમે તેને બેકએન્ડમાંથી લાવી શકો છો
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue 2026',
        // અહીં તમારા મહિના મુજબના સેલ્સના આંકડા આવશે
        data: [15000, 22000, 19000, 25000, 21000, 29000, 32000, data.totalSales, 0, 0, 0, 0], 
        borderColor: '#FFC107', // Warning yellow color for vault style
        backgroundColor: 'rgba(255, 193, 7, 0.2)',
        tension: 0.3, // Curve smoothness
        fill: true,
        pointBackgroundColor: '#000',
        pointBorderColor: '#FFC107',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows custom height
    plugins: {
      legend: {
        display: false, // Hide legend to match vault style
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis grid
        },
        ticks: {
          color: '#555',
          font: { fw: 'bold' },
        },
      },
      y: {
        grid: {
          color: 'rgba(0,0,0,0.05)', // Light grid for y-axis
        },
        beginAtZero: true,
        ticks: {
          color: '#555',
          font: { fw: 'bold' },
          callback: function(value) {
            return '₹' + value / 1000 + 'k'; // Format y-axis to ₹ k
          },
        },
      },
    },
  };

  // --- --- ---

  if (loading) return <div className="p-5 text-center">Scanning Vault Stats...</div>;

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-black italic text-uppercase mb-0">Vault_Overview</h2>
        <button onClick={fetchStats} className="btn btn-sm btn-dark rounded-pill px-3">Scan Again</button>
      </div>
      
      {/* Stats Cards Row */}
      <div className="row g-4 mb-5">
        {stats.map((s, i) => (
          <div className="col-md-3" key={i}>
            <div className={`card border-0 shadow-sm p-4 bg-white rounded-4 border-bottom border-5 border-${s.color} transition-up`}>
              <div className="d-flex justify-content-between align-items-start mb-3">
                <small className="fw-black text-muted tracking-widest text-uppercase" style={{fontSize: '0.7rem'}}>{s.label}</small>
                <span className="fs-4">{s.icon}</span>
              </div>
              <h2 className="fw-black mb-0">{s.val}</h2>
            </div>
          </div>
        ))}
      </div>
      
      {/* Chart and System Health Row */}
      <div className="row g-4">
        <div className="col-md-8">
            <div className="card border-0 shadow-lg p-5 bg-white rounded-5 h-100">
                <h6 className="fw-black italic text-muted text-uppercase mb-4 border-bottom pb-3">Revenue_Growth_Analytics (Live)</h6>
                <div className="py-2" style={{ height: '300px' }}> {/* Custom height for chart */}
                    {/* Line Chart Component */}
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
        <div className="col-md-4">
            <div className="card border-0 shadow p-4 bg-dark text-white rounded-5 h-100">
                <h6 className="fw-black italic text-uppercase text-warning mb-4">System_Health</h6>
                <div className="d-flex justify-content-between mb-3 border-bottom border-secondary pb-2">
                    <span className="text-muted">Server Status</span>
                    <span className="text-success fw-bold">ONLINE</span>
                </div>
                <div className="d-flex justify-content-between mb-3 border-bottom border-secondary pb-2">
                    <span className="text-muted">Database</span>
                    <span className="text-success fw-bold">CONNECTED</span>
                </div>
                <div className="d-flex justify-content-between">
                    <span className="text-muted">Vault Security</span>
                    <span className="text-warning fw-bold">ACTIVE</span>
                </div>
                <div className="text-center mt-5">
                    <h1 className="display-1 opacity-10">🔒</h1>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;