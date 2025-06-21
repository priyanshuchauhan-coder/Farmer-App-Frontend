import { useState, useEffect } from 'react';
import { 
  Container, 
  Card, 
  Button, 
  Row, 
  Col, 
  Spinner, 
  Alert,
  Modal,
  Form,
  Image,
  Badge
} from 'react-bootstrap';
import { 
  FaPlus, 
  FaSearch, 
  FaFilter, 
  FaCalendarAlt,
  FaMoneyBillWave,
  FaBox,
  FaMapMarkerAlt,
  FaEdit,
  FaTrash
} from 'react-icons/fa';

const AllCrops = () => {
  const [crops, setCrops] = useState([
    {
      _id: '1',
      cropName: 'Organic Tomatoes',
      description: 'Fresh organic tomatoes grown without pesticides',
      quantity: 100,
      pricePerUnit: 50,
      unit: 'kg',
      harvestDate: '2023-06-15',
      location: 'Nashik, Maharashtra',
      imageUrls: ['https://images.unsplash.com/photo-1592841200221-a6899ff5c0d5'],
      remainingQuantity: 75,
      isAvailable: true
    },
    {
      _id: '2',
      cropName: 'Basmati Rice',
      description: 'Premium quality basmati rice, export quality',
      quantity: 500,
      pricePerUnit: 80,
      unit: 'kg',
      harvestDate: '2023-05-20',
      location: 'Punjab',
      imageUrls: ['https://images.unsplash.com/photo-1601050690597-df0568f70950'],
      remainingQuantity: 200,
      isAvailable: true
    },
    {
      _id: '3',
      cropName: 'Alphonso Mangoes',
      description: 'Sweet and juicy Alphonso mangoes, Ratnagiri variety',
      quantity: 200,
      pricePerUnit: 120,
      unit: 'kg',
      harvestDate: '2023-04-10',
      location: 'Ratnagiri, Maharashtra',
      imageUrls: ['https://images.unsplash.com/photo-1601493700631-2b16ec4b4716'],
      remainingQuantity: 0,
      isAvailable: false
    },
    {
      _id: '4',
      cropName: 'Organic Cotton',
      description: '100% organic cotton, pesticide free',
      quantity: 1000,
      pricePerUnit: 150,
      unit: 'kg',
      harvestDate: '2023-07-01',
      location: 'Gujarat',
      imageUrls: ['https://images.unsplash.com/photo-1534536281715-e28d76689b4d'],
      remainingQuantity: 600,
      isAvailable: true
    },
    {
      _id: '5',
      cropName: 'Sugarcane',
      description: 'High yield sugarcane, ready for harvest',
      quantity: 5000,
      pricePerUnit: 35,
      unit: 'kg',
      harvestDate: '2023-06-30',
      location: 'Uttar Pradesh',
      imageUrls: ['https://images.unsplash.com/photo-1605000797499-95e51c3e0b54'],
      remainingQuantity: 3000,
      isAvailable: true
    },
    {
      _id: '6',
      cropName: 'Turmeric',
      description: 'Organic turmeric with high curcumin content',
      quantity: 300,
      pricePerUnit: 200,
      unit: 'kg',
      harvestDate: '2023-05-15',
      location: 'Erode, Tamil Nadu',
      imageUrls: ['https://images.unsplash.com/photo-1603569283847-aa295f0d016a'],
      remainingQuantity: 100,
      isAvailable: true
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterUnit, setFilterUnit] = useState('all');
  const [filterAvailability, setFilterAvailability] = useState('all');

  // Form state
  const [formData, setFormData] = useState({
    cropName: '',
    description: '',
    quantity: '',
    pricePerUnit: '',
    unit: 'kg',
    harvestDate: '',
    location: '',
    imageUrls: []
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({
          ...formData,
          imageUrls: [...formData.imageUrls, reader.result]
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCrop = {
        _id: Math.random().toString(36).substr(2, 9),
        ...formData,
        quantity: parseFloat(formData.quantity),
        pricePerUnit: parseFloat(formData.pricePerUnit),
        remainingQuantity: parseFloat(formData.quantity),
        isAvailable: true,
        harvestDate: new Date(formData.harvestDate).toISOString()
      };
      
      setCrops([...crops, newCrop]);
      setShowAddModal(false);
      resetForm();
    } catch (err) {
      setError('Failed to add crop');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      cropName: '',
      description: '',
      quantity: '',
      pricePerUnit: '',
      unit: 'kg',
      harvestDate: '',
      location: '',
      imageUrls: []
    });
    setImagePreview(null);
  };

  // Filter crops based on search and filters
  const filteredCrops = crops.filter(crop => {
    const matchesSearch = crop.cropName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         crop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesUnit = filterUnit === 'all' || crop.unit === filterUnit;
    const matchesAvailability = filterAvailability === 'all' || 
                              (filterAvailability === 'available' && crop.isAvailable) ||
                              (filterAvailability === 'sold' && !crop.isAvailable);
    
    return matchesSearch && matchesUnit && matchesAvailability;
  });

  if (loading && !showAddModal) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Loading crops...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="outline-success" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Crop Marketplace</h2>
        <Button variant="success" onClick={() => setShowAddModal(true)}>
          <FaPlus className="me-2" />
          Add New Crop
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Row>
            <Col md={6}>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search crops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </Col>
            <Col md={3}>
              <Form.Select 
                value={filterUnit}
                onChange={(e) => setFilterUnit(e.target.value)}
              >
                <option value="all">All Units</option>
                <option value="kg">Kilograms</option>
                <option value="quintal">Quintal</option>
                <option value="tonne">Tonne</option>
                <option value="liter">Liter</option>
                <option value="unit">Unit</option>
              </Form.Select>
            </Col>
            <Col md={3}>
              <Form.Select
                value={filterAvailability}
                onChange={(e) => setFilterAvailability(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="sold">Sold Out</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Crops List */}
      {filteredCrops.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredCrops.map((crop) => (
            <Col key={crop._id}>
              <Card className="h-100 shadow-sm">
                {crop.imageUrls?.length > 0 && (
                  <Card.Img 
                    variant="top" 
                    src={crop.imageUrls[0]} 
                    style={{ height: '200px', objectFit: 'cover' }} 
                  />
                )}
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start">
                    <Card.Title>{crop.cropName}</Card.Title>
                    <Badge bg={crop.isAvailable ? 'success' : 'secondary'}>
                      {crop.isAvailable ? 'Available' : 'Sold Out'}
                    </Badge>
                  </div>
                  <Card.Text className="text-muted">
                    {crop.description}
                  </Card.Text>
                  <div className="mb-2">
                    <FaMoneyBillWave className="me-2 text-success" />
                    <strong>Price:</strong> ₹{crop.pricePerUnit} per {crop.unit}
                  </div>
                  <div className="mb-2">
                    <FaBox className="me-2 text-success" />
                    <strong>Quantity:</strong> {crop.remainingQuantity || crop.quantity} {crop.unit}
                  </div>
                  <div className="mb-2">
                    <FaCalendarAlt className="me-2 text-success" />
                    <strong>Harvest Date:</strong> {new Date(crop.harvestDate).toLocaleDateString()}
                  </div>
                  <div className="mb-3">
                    <FaMapMarkerAlt className="me-2 text-success" />
                    <strong>Location:</strong> {crop.location}
                  </div>
                  <div className="d-flex justify-content-between">
                    <Button variant="outline-primary" size="sm">
                      <FaEdit className="me-1" />
                      Edit
                    </Button>
                    <Button variant="outline-danger" size="sm">
                      <FaTrash className="me-1" />
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info" className="text-center">
          No crops found matching your criteria
        </Alert>
      )}

      {/* Add Crop Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Crop for Sale</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="cropName">
                  <Form.Label>Crop Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="cropName"
                    value={formData.cropName}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="unit">
                  <Form.Label>Unit *</Form.Label>
                  <Form.Select
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="kg">Kilogram (kg)</option>
                    <option value="quintal">Quintal</option>
                    <option value="tonne">Tonne</option>
                    <option value="liter">Liter</option>
                    <option value="unit">Unit</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="quantity">
                  <Form.Label>Quantity *</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    min="1"
                    step="0.1"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="pricePerUnit">
                  <Form.Label>Price Per Unit (₹) *</Form.Label>
                  <Form.Control
                    type="number"
                    name="pricePerUnit"
                    value={formData.pricePerUnit}
                    onChange={handleInputChange}
                    min="0.1"
                    step="0.1"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="harvestDate">
                  <Form.Label>Harvest Date *</Form.Label>
                  <Form.Control
                    type="date"
                    name="harvestDate"
                    value={formData.harvestDate}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="location">
                  <Form.Label>Location *</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Crop Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {imagePreview && (
                <div className="mt-2">
                  <Image src={imagePreview} thumbnail style={{ maxHeight: '150px' }} />
                </div>
              )}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
              setShowAddModal(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Crop'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AllCrops;