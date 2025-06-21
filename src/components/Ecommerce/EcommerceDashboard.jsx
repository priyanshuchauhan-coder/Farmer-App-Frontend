import { useState, useEffect,useContext } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Button, 
  Table, 
  Badge,
  Dropdown,
  ProgressBar,
  Alert,
  Spinner,
  ListGroup,
  Form,
  InputGroup
} from 'react-bootstrap';
import { 
  FaTractor, 
  FaChartLine, 
  FaCalendarAlt,
  FaSeedling,
  FaShoppingCart,
  FaStore,
  FaMoneyBillWave,
  FaChartBar,
  FaSearch,
  FaFilter,
  FaRupeeSign,
  FaBoxOpen,
  FaShippingFast,
  FaPercentage,
  FaEye,
  FaEdit
} from 'react-icons/fa';
import bioFertilizer from '../../assets/bioFertilizer.jpg';
import dripIrrigation from '../../assets/dripIrrigation.jpg';
import organicWheat from '../../assets/organicWheat.jpg';
import tamatoSeed from '../../assets/tamatoSeed.jpg';
import EcommContext from '../../context/EcomContext';
// import AuthContext from '../../context/AuthContext';
// import { useContext } from 'react';

const EcommerceDashboard = () => {
  const navigate = useNavigate();
const {fetchDashboardData, loading: contextLoading, error: contextError } = useContext(EcommContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('marketplace'); // 'marketplace', 'myListings', 'orders'
  const [searchTerm, setSearchTerm] = useState('');
  //  const [showDeleteModal, setShowDeleteModal] = useState(false);
  //   const [deletingId, setDeletingId] = useState(null);
  //   const [deleting, setDeleting] = useState(false);

  // Mock data - replace with actual API calls
  const [marketData, setMarketData] = useState({
    trendingProducts: [],
    priceHighlights: [],
    demandTrends: [],
    myListings: [],
    orders: [],
    transactions: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Simulate API calls
        const mockData = {
          trendingProducts: [
            {
              id: 1,
              name: "Organic Wheat Seeds",
              category: "Seeds",
              price: 1200,
              unit: "10 kg",
              rating: 4.8,
              seller: "AgroSeed Co.",
              discount: 15,
              image: organicWheat
            },
            {
              id: 2,
              name: "Bio Fertilizer",
              category: "Fertilizers",
              price: 850,
              unit: "5 kg",
              rating: 4.5,
              seller: "GreenGrowth",
              discount: 10,
              image: bioFertilizer
            },
            {
              id: 3,
              name: "Drip Irrigation Kit",
              category: "Equipment",
              price: 4500,
              unit: "Set",
              rating: 4.7,
              seller: "FarmTech",
              discount: 20,
              image: dripIrrigation
            },
            {
              id: 4,
              name: "Hybrid Tomato Seeds",
              category: "Seeds",
              price: 650,
              unit: "500g",
              rating: 4.6,
              seller: "SeedMaster",
              discount: 5,
              image: tamatoSeed
            }
          ],
          priceHighlights: [
            {
              crop: "Rice",
              currentPrice: 1850,
              unit: "quintal",
              change: "+5.2%",
              trend: "up"
            },
            {
              crop: "Wheat",
              currentPrice: 1650,
              unit: "quintal",
              change: "-2.1%",
              trend: "down"
            },
            {
              crop: "Maize",
              currentPrice: 1420,
              unit: "quintal",
              change: "+3.7%",
              trend: "up"
            },
            {
              crop: "Soybean",
              currentPrice: 3200,
              unit: "quintal",
              change: "+8.5%",
              trend: "up"
            }
          ],
          demandTrends: [
            {
              crop: "Organic Vegetables",
              demandLevel: "High",
              season: "Current",
              regions: ["North", "West"]
            },
            {
              crop: "Basmati Rice",
              demandLevel: "Very High",
              season: "Current",
              regions: ["All India"]
            },
            {
              crop: "Cotton",
              demandLevel: "Medium",
              season: "Upcoming",
              regions: ["South", "West"]
            }
          ],
          myListings: [
            {
              id: 101,
              crop: "Organic Wheat",
              quantity: 50,
              unit: "quintal",
              price: 1800,
              listedDate: "2023-06-10",
              status: "Active",
              views: 124,
              inquiries: 8
            },
            {
              id: 102,
              crop: "Basmati Rice",
              quantity: 30,
              unit: "quintal",
              price: 2200,
              listedDate: "2023-06-05",
              status: "Sold",
              views: 215,
              inquiries: 15
            },
            {
              id: 103,
              crop: "Mustard Seeds",
              quantity: 20,
              unit: "quintal",
              price: 3500,
              listedDate: "2023-05-28",
              status: "Active",
              views: 87,
              inquiries: 5
            }
          ],
          orders: [
            {
              id: "ORD-1001",
              date: "2023-06-12",
              items: [
                { name: "Bio Pesticide", qty: 2, price: 450 }
              ],
              total: 900,
              status: "Delivered",
              deliveryDate: "2023-06-15"
            },
            {
              id: "ORD-1002",
              date: "2023-06-08",
              items: [
                { name: "Potato Seeds", qty: 5, price: 1200 },
                { name: "Fertilizer", qty: 1, price: 650 }
              ],
              total: 1850,
              status: "Shipped",
              deliveryDate: "Expected 2023-06-18"
            }
          ],
          transactions: [
            {
              id: "TXN-2001",
              date: "2023-06-15",
              amount: 18000,
              type: "Credit",
              description: "Sale of Wheat",
              status: "Completed"
            },
            {
              id: "TXN-2002",
              date: "2023-06-10",
              amount: 4500,
              type: "Debit",
              description: "Purchase of Seeds",
              status: "Completed"
            }
          ]
        };
        const response=await fetchDashboardData();
        if(response.success)
        {
          mockData.myListings=response.data;
        }
        setMarketData(mockData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load e-commerce data");
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, [fetchDashboardData]);
 const getAvailabilityBadge = (isAvailable, remainingQuantity) => {
    if (!isAvailable) {
      return <Badge bg="secondary">Not Available</Badge>;
    }
    return remainingQuantity > 0 ? 
      <Badge bg="success">Available</Badge> : 
      <Badge bg="danger">Sold Out</Badge>;
  };
  // const handleDelete = async () => {
  //     try {
  //       setDeleting(true);
  //       // await axios.delete(`/api/crops/${deletingId}`);
  //       const response=await deleteSellCrop(deletingId);
  //       if(response?.success)
  //       {
  //         setCrops(crops.filter(crop => crop._id !== deletingId));
  //         setMarketData({myListings:[]})
  //       toast.success('Crop deleted successfully');
  //       setShowDeleteModal(false);
  //       }
  //       else{
  
        
       
  //       toast.error('Crop does not deleted ');
  //       setShowDeleteModal(false);
  //       }
  //     } catch (err) {
  //       toast.error(err.response?.data?.message || 'Failed to delete crop');
  //     } finally {
  //       setDeleting(false);
  //     }
  //   };
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchTerm);
  };

  const filteredProducts = marketData.trendingProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Loading E-Commerce Dashboard...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="outline-success" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container fluid className="px-0">
      {/* Header */}
      <header className="bg-success text-white py-3 shadow-sm" style={{marginTop:"4%"}}>
        <Container>
          <Row className="align-items-center">
            <Col>
              <h2 className="mb-0">
                <FaStore className="me-2" />
                FarmEzy Marketplace
              </h2>
            </Col>
            <Col className="text-end">
              <Button 
                variant="outline-light" 
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="me-2"
              >
                Back to Main Dashboard
              </Button>
            </Col>
          </Row>
        </Container>
      </header>

      {/* Main Content */}
      <Container className="py-4">
        {/* Navigation Tabs */}
        <Row className="mb-4">
          <Col>
            <div className="d-flex border-bottom">
              <Button 
                variant={activeTab === 'marketplace' ? 'success' : 'outline-success'} 
                className="me-2 rounded-0 border-0"
                onClick={() => setActiveTab('marketplace')}
              >
                <FaStore className="me-2" />
                Marketplace
              </Button>
              <Button 
                variant={activeTab === 'myListings' ? 'success' : 'outline-success'} 
                className="me-2 rounded-0 border-0"
                onClick={() => setActiveTab('myListings')}
              >
                <FaBoxOpen className="me-2" />
                My Listings
              </Button>
              <Button 
                variant={activeTab === 'orders' ? 'success' : 'outline-success'} 
                className="me-2 rounded-0 border-0"
                onClick={() => setActiveTab('orders')}
              >
                <FaShoppingCart className="me-2" />
                Orders & Transactions
              </Button>
            </div>
          </Col>
        </Row>

        {/* Marketplace Tab */}
        {activeTab === 'marketplace' && (
          <>
            {/* Search and Filter */}
            <Row className="mb-4">
              <Col md={8}>
                <Form onSubmit={handleSearch}>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Search for crops, seeds, equipment..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="success" type="submit">
                      <FaSearch className="me-2" />
                      Search
                    </Button>
                    <Button variant="outline-secondary">
                      <FaFilter className="me-2" />
                      Filters
                    </Button>
                  </InputGroup>
                </Form>
              </Col>
              <Col md={4} className="text-end">
                <Button variant="success" onClick={() => navigate('/crops/new')}>
                  <FaMoneyBillWave className="me-2" />
                  Sell Your Crops
                </Button>
              </Col>
            </Row>

            {/* Trending Products */}
            <Row className="mb-4">
              <Col>
                <Card className="shadow-sm">
                  <Card.Header className="bg-light">
                    <h5 className="mb-0">
                      <FaChartBar className="me-2 text-success" />
                      Trending Products to Buy
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      {filteredProducts.map((product) => (
                        <Col key={product.id} md={3} className="mb-4">
                          <Card className="h-100">
                            <div className="position-relative">
                              <Card.Img 
                                variant="top" 
                                src={product.image} 
                                style={{ height: '150px', objectFit: 'cover' }}
                              />
                              {product.discount > 0 && (
                                <Badge bg="danger" className="position-absolute top-0 end-0 m-2">
                                  {product.discount}% OFF
                                </Badge>
                              )}
                            </div>
                            <Card.Body>
                              <Card.Title className="h6">{product.name}</Card.Title>
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <span className="fw-bold text-success">
                                  <FaRupeeSign /> {product.price} / {product.unit}
                                </span>
                                <Badge bg="warning" text="dark">
                                  {product.rating} ★
                                </Badge>
                              </div>
                              <small className="text-muted">Sold by: {product.seller}</small>
                            </Card.Body>
                            <Card.Footer className="bg-white border-0">
                              <Button variant="outline-success" size="sm" className="w-100">
                                <FaShoppingCart className="me-2" />
                                Add to Cart
                              </Button>
                            </Card.Footer>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Market Highlights */}
            <Row>
              {/* Price Highlights */}
              <Col md={6} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Header className="bg-light">
                    <h5 className="mb-0">
                      <FaChartLine className="me-2 text-success" />
                      Current Crop Prices
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <Table hover>
                      <thead>
                        <tr>
                          <th>Crop</th>
                          <th>Price</th>
                          <th>Change</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {marketData.priceHighlights.map((crop, index) => (
                          <tr key={index}>
                            <td className="fw-bold">{crop.crop}</td>
                            <td>
                              <FaRupeeSign /> {crop.currentPrice} / {crop.unit}
                            </td>
                            <td className={crop.trend === 'up' ? 'text-success' : 'text-danger'}>
                              {crop.change}
                            </td>
                            <td>
                              <Button variant="outline-success" size="sm">
                                View Details
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>

              {/* Demand Trends */}
              <Col md={6} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Header className="bg-light">
                    <h5 className="mb-0">
                      <FaChartBar className="me-2 text-success" />
                      Crop Demand Trends
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      {marketData.demandTrends.map((trend, index) => (
                        <ListGroup.Item key={index}>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <h6 className="mb-1">{trend.crop}</h6>
                              <small className="text-muted">
                                Season: {trend.season} | Regions: {trend.regions.join(', ')}
                              </small>
                            </div>
                            <Badge bg={
                              trend.demandLevel === 'Very High' ? 'danger' : 
                              trend.demandLevel === 'High' ? 'success' : 
                              'warning'
                            }>
                              {trend.demandLevel} Demand
                            </Badge>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                    <div className="mt-3">
                      <Button variant="outline-success" size="sm">
                        View Full Market Report
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}

        {/* My Listings Tab */}
        {activeTab === 'myListings' && (
          <Row>
            <Col>
              <Card className="shadow-sm">
                <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <FaBoxOpen className="me-2 text-success" />
                    My Latest Crop Listings
                  </h5>
                  <Button variant="success" size="sm" onClick={() => navigate('/crops/new')}>
                    + Add New Listing
                  </Button>
                </Card.Header>
                <Card.Body>
                  {/* <Table hover responsive>
                    <thead>
                      <tr>
                        <th>Crop</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Listed On</th>
                        <th>Views/Inquiries</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketData.myListings.map((listing) => (
                        <tr key={listing.id}>
                          <td className="fw-bold">{listing.crop}</td>
                          <td>{listing.quantity} {listing.unit}</td>
                          <td><FaRupeeSign /> {listing.price} / {listing.unit}</td>
                          <td>
                            <Badge bg={
                              listing.status === 'Active' ? 'success' : 
                              listing.status === 'Sold' ? 'primary' : 'secondary'
                            }>
                              {listing.status}
                            </Badge>
                          </td>
                          <td>{listing.listedDate}</td>
                          <td>
                            <small>Views: {listing.views}</small><br />
                            <small>Inquiries: {listing.inquiries}</small>
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button variant="outline-primary" size="sm">
                                <FaEye className="me-1" /> View
                              </Button>
                              <Button variant="outline-warning" size="sm">
                                <FaEdit className="me-1" /> Edit
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table> */}
                  {marketData.myListings.length > 0 ? (
        <>
          <div className="table-responsive">
            <Table striped hover className="mb-4">
              <thead>
                <tr>
                  <th>Crop</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Harvest Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {marketData.myListings.slice(0, 4).map((crop) => (
                  <tr key={crop._id}>
                    <td>
                      <div className="fw-bold">{crop.cropName}</div>
                      <small className="text-muted text-truncate" style={{maxWidth: '200px', display: 'inline-block'}}>
                        {crop.description.substring(0, 50)}{crop.description.length > 50 ? '...' : ''}
                      </small>
                    </td>
                    <td>₹{crop.pricePerUnit?.toFixed(2)}</td>
                    <td>
                      {crop.remainingQuantity !== undefined ? 
                        `${crop.remainingQuantity} / ${crop.quantity}` : 
                        crop.quantity}
                    </td>
                    <td>{crop.unit}</td>
                    <td>{new Date(crop.harvestDate).toLocaleDateString()}</td>
                    <td>{getAvailabilityBadge(crop.isAvailable, crop.remainingQuantity || crop.quantity)}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle variant="outline-success" size="sm" id="dropdown-actions">
                          Actions
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => navigate(`/crops/${crop._id}`)}>
                            <FaEye className="me-2" />
                            View Details
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => navigate(`/crops/${crop._id}/edit`)}>
                            <FaEdit className="me-2" />
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => navigate(`/crops/${crop._id}/analytics`)}>
                            <FaChartLine className="me-2" />
                            View Analytics
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          {/* <Dropdown.Item 
                            onClick={() => {
                              setDeletingId(crop._id);
                              setShowDeleteModal(true);
                            }}
                            className="text-danger"
                          >
                            <FaTrash className="me-2" />
                            Delete
                          </Dropdown.Item> */}
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Card className="text-center py-5 shadow-sm">
          <Card.Body>
            {/* <h5 className="text-muted">More Crops</h5> */}
            <p>You have more listed  crops for sale </p>
            <Button variant="success" onClick={() => navigate('/crops')}>
              See All Listed Crops
            </Button>
          </Card.Body>
        </Card>
          </div>

          
        </>
      ) : (
        <Card className="text-center py-5 shadow-sm">
          <Card.Body>
            <h5 className="text-muted">No crops found</h5>
            <p>You haven't listed any crops for sale yet</p>
            <Button variant="success" onClick={() => navigate('/crops/new')}>
              Add Your First Crop
            </Button>
          </Card.Body>
        </Card>
      )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Orders & Transactions Tab */}
        {activeTab === 'orders' && (
          <Row>
            {/* Orders */}
            <Col md={6} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Header className="bg-light">
                  <h5 className="mb-0">
                    <FaShoppingCart className="me-2 text-success" />
                    My Orders
                  </h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {marketData.orders.map((order) => (
                      <ListGroup.Item key={order.id}>
                        <div className="d-flex justify-content-between mb-2">
                          <strong>Order #{order.id}</strong>
                          <Badge bg={
                            order.status === 'Delivered' ? 'success' : 
                            order.status === 'Shipped' ? 'primary' : 'warning'
                          }>
                            {order.status}
                          </Badge>
                        </div>
                        <small className="text-muted">Date: {order.date}</small>
                        <div className="mt-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="d-flex justify-content-between">
                              <span>{item.name} (x{item.qty})</span>
                              <span><FaRupeeSign /> {item.price * item.qty}</span>
                            </div>
                          ))}
                        </div>
                        <div className="d-flex justify-content-between mt-2 fw-bold">
                          <span>Total:</span>
                          <span><FaRupeeSign /> {order.total}</span>
                        </div>
                        {order.deliveryDate && (
                          <small className="text-muted d-block mt-1">
                            {order.status === 'Delivered' ? 'Delivered on' : 'Expected'} {order.deliveryDate}
                          </small>
                        )}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>

            {/* Transactions */}
            <Col md={6} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Header className="bg-light">
                  <h5 className="mb-0">
                    <FaMoneyBillWave className="me-2 text-success" />
                    Transactions
                  </h5>
                </Card.Header>
                <Card.Body>
                  <Table hover>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketData.transactions.map((txn) => (
                        <tr key={txn.id}>
                          <td>{txn.id}</td>
                          <td>{txn.date}</td>
                          <td className={txn.type === 'Credit' ? 'text-success' : 'text-danger'}>
                            <FaRupeeSign /> {txn.amount}
                          </td>
                          <td>{txn.type}</td>
                          <td>
                            <Badge bg={txn.status === 'Completed' ? 'success' : 'warning'}>
                              {txn.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
                <Card.Footer className="bg-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">Showing last 5 transactions</small>
                    <Button variant="outline-success" size="sm">
                      View All
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        )}
      </Container>

      {/* CSS Styles */}
      <style jsx="true">{`
        .card-img-top {
          border-bottom: 1px solid rgba(0,0,0,.125);
        }
        .badge {
          font-weight: 500;
        }
        .list-group-item {
          border-left: 0;
          border-right: 0;
        }
        .list-group-item:first-child {
          border-top: 0;
        }
      `}</style>
    </Container>
  );
};

export default EcommerceDashboard;