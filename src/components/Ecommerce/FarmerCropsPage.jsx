import { useState, useEffect,useMemo,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Table,
  Button,
  Badge,
  Spinner,
  Alert,
  Dropdown,
  Pagination,
  Modal,
  Form,
  Row,
  Col,
  InputGroup,
  Card
} from 'react-bootstrap';
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaSeedling,
  FaSearch,
  FaFilter,
  FaPlus,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaChartLine
} from 'react-icons/fa';
import { toast } from 'react-toastify';

import EcommContext from '../../context/EcomContext';

const FarmerCropsPage = () => {
  const navigate = useNavigate();
  const {getAllToSellCrops,deleteSellCrop,loading: contextLoading, error: contextError } = useContext(EcommContext);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [filterUnit, setFilterUnit] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const units = ['kg', 'quintal', 'tonne', 'liter', 'unit'];

const initialData = useMemo(() => ({
    dummyCrops : [
  {
    _id: '1',
    cropName: 'Organic Wheat',
    description: 'High-quality organic wheat harvested this season',
    unit: 'kg',
    quantity: 500,
    pricePerUnit: 25.5,
    harvestDate: '2023-06-15T00:00:00.000Z',
    isAvailable: true,
    location: 'Punjab, India',
    imageUrls: [
      'https://example.com/wheat1.jpg',
      'https://example.com/wheat2.jpg'
    ],
    remainingQuantity: 350,
    createdAt: '2023-05-10T00:00:00.000Z'
  },
  {
    _id: '2',
    cropName: 'Basmati Rice',
    description: 'Premium basmati rice with long grains',
    unit: 'quintal',
    quantity: 20,
    pricePerUnit: 2200,
    harvestDate: '2023-07-01T00:00:00.000Z',
    isAvailable: true,
    location: 'Haryana, India',
    imageUrls: [
      'https://example.com/rice1.jpg'
    ],
    remainingQuantity: 5,
    createdAt: '2023-04-25T00:00:00.000Z'
  },
  {
    _id: '3',
    cropName: 'Alphonso Mangoes',
    description: 'Sweet and juicy alphonso mangoes',
    unit: 'unit',
    quantity: 1000,
    pricePerUnit: 35,
    harvestDate: '2023-05-20T00:00:00.000Z',
    isAvailable: false,
    location: 'Maharashtra, India',
    imageUrls: [
      'https://example.com/mango1.jpg',
      'https://example.com/mango2.jpg',
      'https://example.com/mango3.jpg'
    ],
    remainingQuantity: 0,
    createdAt: '2023-03-15T00:00:00.000Z'
  },
  {
    _id: '4',
    cropName: 'Tomatoes',
    description: 'Fresh organic tomatoes',
    unit: 'kg',
    quantity: 300,
    pricePerUnit: 18,
    harvestDate: '2023-06-10T00:00:00.000Z',
    isAvailable: true,
    location: 'Karnataka, India',
    imageUrls: [],
    remainingQuantity: 120,
    createdAt: '2023-05-01T00:00:00.000Z'
  },
  {
    _id: '5',
    cropName: 'Cotton',
    description: 'High-grade cotton fiber',
    unit: 'tonne',
    quantity: 5,
    pricePerUnit: 45000,
    harvestDate: '2023-08-15T00:00:00.000Z',
    isAvailable: true,
    location: 'Gujarat, India',
    imageUrls: [
      'https://example.com/cotton1.jpg'
    ],
    remainingQuantity: 5,
    createdAt: '2023-04-10T00:00:00.000Z'
  },
  {
    _id: '6',
    cropName: 'Sugarcane',
    description: 'Juicy sugarcane for direct consumption',
    unit: 'unit',
    quantity: 2000,
    pricePerUnit: 15,
    harvestDate: '2023-07-30T00:00:00.000Z',
    isAvailable: true,
    location: 'Uttar Pradesh, India',
    imageUrls: [],
    remainingQuantity: 1500,
    createdAt: '2023-06-05T00:00:00.000Z'
  },
  {
    _id: '7',
    cropName: 'Potatoes',
    description: 'Fresh potatoes from cold storage',
    unit: 'kg',
    quantity: 1000,
    pricePerUnit: 12,
    harvestDate: '2023-04-15T00:00:00.000Z',
    isAvailable: true,
    location: 'West Bengal, India',
    imageUrls: [
      'https://example.com/potato1.jpg',
      'https://example.com/potato2.jpg'
    ],
    remainingQuantity: 200,
    createdAt: '2023-03-20T00:00:00.000Z'
  }
]
   
  }), []);

  useEffect(() => {
  const fetchFarmerCrops = async () => {
    try {
      setLoading(true);
      // const response = await axios.get('/api/crops/farmer');
      const response =await getAllToSellCrops();
      if(response?.success)
      {
        toast.warn('Data Fetched Successfully.');
        setCrops(response.data);
      }
      else{
 setCrops(initialData.dummyCrops);
      }
      // setCrops(response.data);
     
    } catch (err) {
      console.error('Using dummy data due to API error:', err);
      // setCrops(dummyCrops); // Fallback to dummy data
      setCrops(initialData.dummyCrops);
      toast.warn('Showing sample data. Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  fetchFarmerCrops();
}, [initialData,getAllToSellCrops]);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      // await axios.delete(`/api/crops/${deletingId}`);
      const response=await deleteSellCrop(deletingId);
      if(response?.success)
      {
        setCrops(crops.filter(crop => crop._id !== deletingId));
      toast.success('Crop deleted successfully');
      setShowDeleteModal(false);
      }
      else{

      
     
      toast.error('Crop does not deleted ');
      setShowDeleteModal(false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete crop');
    } finally {
      setDeleting(false);
    }
  };

  const getAvailabilityBadge = (isAvailable, remainingQuantity) => {
    if (!isAvailable) {
      return <Badge bg="secondary">Not Available</Badge>;
    }
    return remainingQuantity > 0 ? 
      <Badge bg="success">Available</Badge> : 
      <Badge bg="danger">Sold Out</Badge>;
  };

  // Filter logic
  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        crop.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAvailability = 
      filterAvailability === 'all' || 
      (filterAvailability === 'available' && crop.isAvailable && crop.remainingQuantity > 0) ||
      (filterAvailability === 'soldout' && (crop.remainingQuantity === 0 || !crop.isAvailable));
    
    const matchesUnit = filterUnit === 'all' || crop.unit === filterUnit;
    
    return matchesSearch && matchesAvailability && matchesUnit;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCrops.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredCrops.length / itemsPerPage);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Loading your crops...</p>
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
    <Container className="mb-5" style={{ marginTop: "8%" }}>
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FaSeedling className="me-2" />
          My Crops for Sale
        </h2>
        <Button variant="success" onClick={() => navigate('/crops/new')}>
          <FaPlus className="me-2" />
          Add New Crop
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row>
            <Col md={5}>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by crop name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text>
                  <FaFilter />
                </InputGroup.Text>
                <Form.Select
                  value={filterAvailability}
                  onChange={(e) => setFilterAvailability(e.target.value)}
                >
                  <option value="all">All Availability</option>
                  <option value="available">Available</option>
                  <option value="soldout">Sold Out</option>
                </Form.Select>
              </InputGroup>
            </Col>
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text>
                  <FaFilter />
                </InputGroup.Text>
                <Form.Select
                  value={filterUnit}
                  onChange={(e) => setFilterUnit(e.target.value)}
                >
                  <option value="all">All Units</option>
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </Form.Select>
              </InputGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Crops Table */}
      {currentItems.length > 0 ? (
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
                {currentItems.map((crop, index) => (
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
                          <Dropdown.Item 
                            onClick={() => {
                              setDeletingId(crop._id);
                              setShowDeleteModal(true);
                            }}
                            className="text-danger"
                          >
                            <FaTrash className="me-2" />
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}
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

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this crop? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Deleting...
              </>
            ) : (
              'Delete Permanently'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FarmerCropsPage;