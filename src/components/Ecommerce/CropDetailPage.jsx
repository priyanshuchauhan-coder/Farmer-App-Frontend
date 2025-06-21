import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Tab,
  Tabs,
  Table,
  Badge,
  Spinner,
  Alert,
  ProgressBar,
  Image,
  Button
} from 'react-bootstrap';
import {
  FaSeedling,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaExchangeAlt,
  FaChartLine,
  FaArrowLeft,
  FaEdit
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import EcommContext from '../../context/EcomContext';

const CropDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCropData } = useContext(EcommContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  
  const [cropData, setCropData] = useState({
    cropName: '',
    description: '',
    unit: 'kg',
    quantity: 0,
    pricePerUnit: 0,
    harvestDate: '',
    isAvailable: true,
    location: '',
    imageUrls: [],
    remainingQuantity: 0,
    soldCount: 0
  });

  const [orders, setOrders] = useState([
    {
      _id: 'order1',
      orderNumber: 'ORD-1001',
      buyer: { name: 'John Smith', email: 'john@example.com' },
      quantity: 50,
      status: 'completed',
      createdAt: '2023-06-20T10:30:00.000Z'
    },
    {
      _id: 'order2',
      orderNumber: 'ORD-1002',
      buyer: { name: 'Sarah Johnson', email: 'sarah@example.com' },
      quantity: 75,
      status: 'completed',
      createdAt: '2023-06-22T14:15:00.000Z'
    },
    {
      _id: 'order3',
      orderNumber: 'ORD-1003',
      buyer: { name: 'Raj Patel', email: 'raj@example.com' },
      quantity: 100,
      status: 'processing',
      createdAt: '2023-06-25T09:45:00.000Z'
    },
    {
      _id: 'order4',
      orderNumber: 'ORD-1004',
      buyer: { name: 'Maria Garcia', email: 'maria@example.com' },
      quantity: 25,
      status: 'completed',
      createdAt: '2023-06-28T16:20:00.000Z'
    },
    {
      _id: 'order5',
      orderNumber: 'ORD-1005',
      buyer: { name: 'David Kim', email: 'david@example.com' },
      quantity: 60,
      status: 'shipped',
      createdAt: '2023-07-01T11:10:00.000Z'
    }
  ]);
  const [transactions, setTransactions] = useState([
    {
      _id: 'tx1',
      transactionId: 'TXN-5001',
      order: { orderNumber: 'ORD-1001' },
      amount: 1275.00,
      paymentMethod: 'Credit Card',
      status: 'success',
      createdAt: '2023-06-20T10:35:00.000Z'
    },
    {
      _id: 'tx2',
      transactionId: 'TXN-5002',
      order: { orderNumber: 'ORD-1002' },
      amount: 1912.50,
      paymentMethod: 'UPI',
      status: 'success',
      createdAt: '2023-06-22T14:20:00.000Z'
    },
    {
      _id: 'tx3',
      transactionId: 'TXN-5003',
      order: { orderNumber: 'ORD-1004' },
      amount: 637.50,
      paymentMethod: 'Net Banking',
      status: 'success',
      createdAt: '2023-06-28T16:25:00.000Z'
    }
  ]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingTransactions, setLoadingTransactions] = useState(true);

  useEffect(() => {
    const fetchCropDetails = async () => {
      try {
        setLoading(true);
        const response = await getCropData(id);
        if (response.success) {
          setCropData(response.data);
          
          // Fetch related orders
        //   const ordersRes = await axios.get(`/api/orders?cropId=${id}`);
        //   setOrders(ordersRes.data);
          
        //   // Fetch related transactions
        //   const transactionsRes = await axios.get(`/api/transactions?cropId=${id}`);
        //   setTransactions(transactionsRes.data);
        } else {
          navigate('/crops');
          toast.error('Crop not found');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch crop data');
        toast.error('Failed to load crop details');
      } finally {
        setLoading(false);
        setLoadingOrders(false);
        setLoadingTransactions(false);
      }
    };

    fetchCropDetails();
  }, [id, getCropData, navigate]);

  // Calculate earnings
  const totalEarnings = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const soldPercentage = ((cropData.quantity - cropData.remainingQuantity) / cropData.quantity) * 100;

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Loading crop details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="outline-success" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mb-5" style={{ marginTop: "8%" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FaSeedling className="me-2" />
          {cropData.cropName} Details
        </h2>
        <div>
          <Button variant="outline-secondary" onClick={() => navigate(-1)} className="me-2">
            <FaArrowLeft className="me-2" />
            Back
          </Button>
          <Button variant="primary" onClick={() => navigate(`/crops/${id}/edit`)}>
            <FaEdit className="me-2" />
            Edit
          </Button>
        </div>
      </div>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="details" title="Crop Details">
          <Row className="mt-4">
            <Col md={8}>
              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <Row>
                    <Col md={6}>
                      <h5 className="text-muted mb-3">Basic Information</h5>
                      <p>
                        <strong>Crop Name:</strong> {cropData.cropName}
                      </p>
                      <p>
                        <strong>Description:</strong> {cropData.description}
                      </p>
                      <p>
                        <strong>Location:</strong> <FaMapMarkerAlt className="me-2" />
                        {cropData.location}
                      </p>
                      <p>
                        <strong>Status:</strong> {cropData.isAvailable ? (
                          <Badge bg="success">Available</Badge>
                        ) : (
                          <Badge bg="secondary">Not Available</Badge>
                        )}
                      </p>
                    </Col>
                    <Col md={6}>
                      <h5 className="text-muted mb-3">Pricing & Quantity</h5>
                      <p>
                        <strong>Price:</strong> ₹{cropData.pricePerUnit?.toFixed(2)} per {cropData.unit}
                      </p>
                      <p>
                        <strong>Total Quantity:</strong> {cropData.quantity} {cropData.unit}
                      </p>
                      <p>
                        <strong>Remaining:</strong> {cropData.remainingQuantity} {cropData.unit}
                      </p>
                      <p>
                        <strong>Harvest Date:</strong> <FaCalendarAlt className="me-2" />
                        {new Date(cropData.harvestDate).toLocaleDateString()}
                      </p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Card className="mb-4 shadow-sm">
                <Card.Body>
                  <h5 className="text-muted mb-3"> Dummy Sales Progress</h5>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Sold: {cropData.quantity - cropData.remainingQuantity===0?(30):(cropData.quantity - cropData.remainingQuantity)} {cropData.unit} </span>
                      <span>{soldPercentage===0?(65):(soldPercentage.toFixed(1))}{}%</span>
                    </div>
                    <ProgressBar now={soldPercentage===0?(65):(soldPercentage)} variant="success" />
                  </div>
                  <div className="d-flex justify-content-around text-center">
                    <div>
                      <h4 className="text-success">{cropData.soldCount===0? (5):(cropData.soldCount)}</h4>
                      <small className="text-muted">Total Orders</small>
                    </div>
                    <div>
                      <h4 className="text-primary">₹{totalEarnings.toFixed(2)}</h4>
                      <small className="text-muted">Total Earnings</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm sticky-top" style={{ top: '20px' }}>
                <Card.Body>
                  <h5 className="text-muted mb-3">Crop Images</h5>
                  {cropData.imageUrls.length > 0 ? (
                    <div className="d-flex flex-column gap-3">
                      {cropData.imageUrls.map((url, index) => (
                        <Image
                          key={index}
                          src={url}
                          alt={`${cropData.cropName} ${index + 1}`}
                          fluid
                          rounded
                          thumbnail
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <FaBoxOpen size={48} className="text-muted mb-3" />
                      <p>No images available</p>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="orders" title="Orders">
          <Card className="mt-4 shadow-sm">
            <Card.Body>
              <h5 className="text-muted mb-4">
                <FaBoxOpen className="me-2" />
                Recent Orders
              </h5>
              {loadingOrders ? (
                <div className="text-center py-4">
                  <Spinner animation="border" variant="success" />
                </div>
              ) : orders.length > 0 ? (
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Buyer</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order.orderNumber}</td>
                        <td>{order.buyer?.name || 'Unknown'}</td>
                        <td>
                          {order.quantity} {cropData.unit}
                        </td>
                        <td>₹{(order.quantity * cropData.pricePerUnit).toFixed(2)}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>
                          <Badge bg={order.status === 'completed' ? 'success' : 'warning'}>
                            {order.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center py-4">
                  <FaBoxOpen size={48} className="text-muted mb-3" />
                  <p>No orders found for this crop</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="transactions" title="Transactions">
          <Card className="mt-4 shadow-sm">
            <Card.Body>
              <h5 className="text-muted mb-4">
                <FaExchangeAlt className="me-2" />
                Payment Transactions
              </h5>
              {loadingTransactions ? (
                <div className="text-center py-4">
                  <Spinner animation="border" variant="success" />
                </div>
              ) : transactions.length > 0 ? (
                <>
                  <div className="d-flex justify-content-end mb-3">
                    <Badge bg="light" text="dark" className="fs-6 p-2">
                      Total Earnings: ₹{totalEarnings.toFixed(2)}
                    </Badge>
                  </div>
                  <Table striped hover responsive>
                    <thead>
                      <tr>
                        <th>Transaction ID</th>
                        <th>Order</th>
                        <th>Amount</th>
                        <th>Payment Method</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <tr key={tx._id}>
                          <td>{tx.transactionId}</td>
                          <td>{tx.order?.orderNumber || 'N/A'}</td>
                          <td>₹{tx.amount.toFixed(2)}</td>
                          <td>{tx.paymentMethod}</td>
                          <td>{new Date(tx.createdAt).toLocaleDateString()}</td>
                          <td>
                            <Badge bg={tx.status === 'success' ? 'success' : 'danger'}>
                              {tx.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              ) : (
                <div className="text-center py-4">
                  <FaExchangeAlt size={48} className="text-muted mb-3" />
                  <p>No transactions found for this crop</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="analytics" title="Analytics">
          <Card className="mt-4 shadow-sm">
            <Card.Body>
              <h5 className="text-muted mb-4">
                <FaChartLine className="me-2" />
                Sales Analytics
              </h5>
              <Row>
                <Col md={6}>
                  <Card className="mb-4">
                    <Card.Body>
                      <h6 className="text-muted">Sales Volume</h6>
                      {/* Placeholder for chart */}
                      <div className="text-center py-5 bg-light rounded">
                        <p className="text-muted">Sales chart will appear here</p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="mb-4">
                    <Card.Body>
                      <h6 className="text-muted">Earnings Trend</h6>
                      {/* Placeholder for chart */}
                      <div className="text-center py-5 bg-light rounded">
                        <p className="text-muted">Earnings chart will appear here</p>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Card>
                    <Card.Body>
                      <h6 className="text-muted">Performance Metrics</h6>
                      <Row className="text-center">
                        <Col md={4}>
                          <h3 className="text-primary">{cropData.soldCount}</h3>
                          <p className="text-muted">Total Orders</p>
                        </Col>
                        <Col md={4}>
                          <h3 className="text-success">
                            ₹{totalEarnings.toFixed(2)}
                          </h3>
                          <p className="text-muted">Total Revenue</p>
                        </Col>
                        <Col md={4}>
                          <h3 className="text-info">
                            {soldPercentage.toFixed(1)}%
                          </h3>
                          <p className="text-muted">Sold Percentage</p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default CropDetailPage;