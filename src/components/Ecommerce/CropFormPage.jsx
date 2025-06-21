import { useState, useEffect,useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EcommContext from '../../context/EcomContext';
import {
  Container,
  Button,
  Alert,
  Spinner,
  Form,
  Row,
  Col,
  InputGroup,
  Card,
  Badge,
  Modal
} from 'react-bootstrap';
import {
  FaSave,
  FaArrowLeft,
  FaSeedling,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaLink,
  FaImages,
  FaPlus,
  FaTrash
} from 'react-icons/fa';
import { toast } from 'react-toastify';


const CropFormPage = ({ mode = 'add' }) => {
  const { id } = useParams();
  const navigate = useNavigate();
   const { saveCropData,updateSellCrop,getCropData,loading: contextLoading, error: contextError } = useContext(EcommContext);
  const [loading, setLoading] = useState(mode === 'edit');
  const [error, setError] = useState(null);
  const [validated, setValidated] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
   const [newImageUrl, setNewImageUrl] = useState('');
  
  const [formData, setFormData] = useState({
    cropName: '',
    description: '',
    unit: 'kg',
    quantity: '',
    pricePerUnit: '',
    harvestDate: '',
    isAvailable: true,
    location: '',
    imageUrls: [],
    remainingQuantity: ''
  });

  const units = ['kg', 'quintal', 'tonne', 'liter', 'unit'];

  useEffect(() => {
    if (mode === 'edit' && id) {
      const fetchCropData = async () => {
        try {
          const response = await getCropData(id);
          if(response.success)
          {

          
          const cropData = response.data;
          
          setFormData({
            cropName: cropData.cropName || '',
            description: cropData.description || '',
            unit: cropData.unit || 'kg',
            quantity: cropData.quantity?.toString() || '',
            pricePerUnit: cropData.pricePerUnit?.toString() || '',
            harvestDate: cropData.harvestDate ? cropData.harvestDate.split('T')[0] : '',
            isAvailable: cropData.isAvailable || true,
            location: cropData.location || '',
            imageUrls: cropData.imageUrls || [],
            remainingQuantity: cropData.remainingQuantity?.toString() || ''
          });
        }
        else{
         
        navigate("/ecommerce-dashboard");
        }
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to fetch crop data');
        } finally {
          setLoading(false);
        }
      };
      
      fetchCropData();
    }
  }, [id, mode,getCropData,navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };
  const addImageUrl = () => {
    if (newImageUrl.trim() && isValidUrl(newImageUrl)) {
      setFormData(prev => ({
        ...prev,
        imageUrls: [...prev.imageUrls, newImageUrl.trim()]
      }));
      setNewImageUrl('');
      toast.success('Image URL added');
    } else {
      toast.error('Please enter a valid image URL');
    }
  };
//   const handleImageUpload = async (e) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;

//     try {
//       setImageUploading(true);
//       const uploadPromises = Array.from(files).map(file => {
//         const formData = new FormData();
//         formData.append('image', file);
//         return axios.post('/api/upload', formData);
//       });

//       const results = await Promise.all(uploadPromises);
//       const newImageUrls = results.map(res => res.data.url);
      
//       setFormData(prev => ({
//         ...prev,
//         imageUrls: [...prev.imageUrls, ...newImageUrls]
//       }));
      
//       toast.success('Images uploaded successfully');
//     } catch (err) {
//       toast.error('Failed to upload images');
//     } finally {
//       setImageUploading(false);
//     }
//   };
const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
//   const removeImage = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       imageUrls: prev.imageUrls.filter((_, i) => i !== index)
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = e.currentTarget;

//     if (form.checkValidity() === false) {
//       e.stopPropagation();
//       setValidated(true);
//       return;
//     }

//     try {
//       setLoading(true);
      
//       // Prepare data for submission
//       const submissionData = {
//         ...formData,
//         quantity: parseFloat(formData.quantity),
//         pricePerUnit: parseFloat(formData.pricePerUnit),
//         remainingQuantity: formData.remainingQuantity ? parseFloat(formData.remainingQuantity) : undefined
//       };

//       if (mode === 'add') {
//         // await axios.post('/api/crops', submissionData);
//          const rData = await saveCropData(submissionData);
//     if (rData?.success) {
//          toast.success('Crop added successfully');
//         navigate('/crops');
      
//     }
//     else{
//         toast.error('Crop Does Not Added');
//         navigate('/crops');
//     }
       
//       } else {
//         // await axios.put(`/api/crops/${id}`, submissionData);
//         const rData = await updateSellCrop(id,submissionData);
//     if (rData?.success) {
//          toast.success('Crop Updated successfully');
//         navigate('/crops');
      
//     }
//     else{
//         toast.error('Crop Does Not Updated');
//         navigate('/crops');
//     }
       
//       }
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 
//                          err.response?.data?.errors?.map(e => e.msg).join(', ') || 
//                          'Failed to save crop data';
//       setError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };
const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      setLoading(true);
      
      // Prepare data for submission
      const submissionData = {
        ...formData,
        quantity: parseFloat(formData.quantity),
        pricePerUnit: parseFloat(formData.pricePerUnit),
        remainingQuantity: formData.remainingQuantity ? parseFloat(formData.remainingQuantity) : undefined,
        // Ensure imageUrls is an array of strings (URLs)
        imageUrls: formData.imageUrls.filter(url => typeof url === 'string' && url.trim() !== '')
      };

      if (mode === 'add') {
        const rData = await saveCropData(submissionData);
        if (rData?.success) {
          toast.success('Crop added successfully');
          navigate('/crops');
        } else {
          toast.error('Crop Does Not Added');
          navigate('/crops');
        }
      } else {
        const rData = await updateSellCrop(id, submissionData);
        if (rData?.success) {
          toast.success('Crop Updated successfully');
          navigate('/crops');
        } else {
          toast.error('Crop Does Not Updated');
          navigate('/crops');
        }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.response?.data?.errors?.map(e => e.msg).join(', ') || 
                         'Failed to save crop data';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading && mode === 'edit') {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Loading crop data...</p>
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
          {mode === 'add' ? 'Add New Crop' : 'Edit Crop'}
        </h2>
        <Button variant="outline-secondary" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-2" />
          Back
        </Button>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="cropName">
                  <Form.Label>Crop Name*</Form.Label>
                  <Form.Control
                    type="text"
                    name="cropName"
                    value={formData.cropName}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Wheat, Rice, Tomatoes"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a crop name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group controlId="unit">
                  <Form.Label>Unit*</Form.Label>
                  <Form.Select
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    required
                  >
                    {units.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="quantity">
                  <Form.Label>Total Quantity*</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                    min="0.01"
                    step="0.01"
                    placeholder="100"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid quantity (greater than 0).
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              {mode === 'edit' && (
                <Col md={6}>
                  <Form.Group controlId="remainingQuantity">
                    <Form.Label>Remaining Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      name="remainingQuantity"
                      value={formData.remainingQuantity}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      placeholder="Same as total quantity if not specified"
                    />
                    <Form.Control.Feedback type="invalid">
                      Remaining quantity cannot be negative.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              )}
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="pricePerUnit">
                  <Form.Label>Price Per Unit (₹)*</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>₹</InputGroup.Text>
                    <Form.Control
                      type="number"
                      name="pricePerUnit"
                      value={formData.pricePerUnit}
                      onChange={handleInputChange}
                      required
                      min="0.01"
                      step="0.01"
                      placeholder="25.50"
                    />
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid price (greater than 0).
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group controlId="harvestDate">
                  <Form.Label>Harvest Date*</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaCalendarAlt />
                    </InputGroup.Text>
                    <Form.Control
                      type="date"
                      name="harvestDate"
                      value={formData.harvestDate}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">
                    Please select a valid harvest date.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="location">
                  <Form.Label>Location*</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaMapMarkerAlt />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Village, District, State"
                    />
                  </InputGroup>
                  <Form.Control.Feedback type="invalid">
                    Please provide a location.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              
              <Col md={6} className="d-flex align-items-end">
                <Form.Group controlId="isAvailable">
                  <Form.Check
                    type="switch"
                    id="isAvailable"
                    name="isAvailable"
                    label="Currently Available"
                    checked={formData.isAvailable}
                    onChange={handleCheckboxChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description*</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Describe the crop quality, variety, etc."
              />
              <Form.Control.Feedback type="invalid">
                Please provide a description.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="imageUrls">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <Form.Label>Images</Form.Label>
                <Button 
                  variant="outline-success" 
                  size="sm"
                  onClick={() => setShowImageModal(true)}
                >
                  <FaImages className="me-2" />
                  Manage Images
                </Button>
              </div>
              
              {formData.imageUrls.length > 0 ? (
                <div className="d-flex flex-wrap gap-2">
                  {formData.imageUrls.map((url, index) => (
                    <Badge key={index} pill bg="light" text="dark" className="p-2">
                      Image {index + 1}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="text-muted">No images added</div>
              )}
            </Form.Group>

            <div className="d-flex justify-content-end mt-4">
              <Button 
                variant="outline-secondary" 
                className="me-3" 
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button 
                variant="success" 
                type="submit" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    {mode === 'add' ? 'Adding...' : 'Saving...'}
                  </>
                ) : (
                  <>
                    <FaSave className="me-2" />
                    {mode === 'add' ? 'Add Crop' : 'Save Changes'}
                  </>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Image Management Modal */}
      {/* <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaImages className="me-2" />
            Manage Crop Images
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formData.imageUrls.length > 0 && (
            <>
              <h6>Current Images</h6>
              <div className="d-flex flex-wrap gap-3 mb-4">
                {formData.imageUrls.map((url, index) => (
                  <div key={index} className="position-relative">
                    <img 
                      src={url} 
                      alt={`Crop ${index + 1}`} 
                      className="img-thumbnail" 
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      className="position-absolute top-0 end-0 rounded-circle p-1"
                      onClick={() => removeImage(index)}
                    >
                      <FaTrash size={10} />
                    </Button>
                  </div>
                ))}
              </div>
              <hr />
            </>
          )}
          
          <div className="text-center">
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <Button 
              variant="success"
              as="label"
              htmlFor="imageUpload"
              disabled={imageUploading}
            >
              {imageUploading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Uploading...
                </>
              ) : (
                <>
                  <FaPlus className="me-2" />
                  Upload New Images
                </>
              )}
            </Button>
            <p className="text-muted mt-2">Supports JPG, PNG (Max 5MB each)</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaImages className="me-2" />
            Manage Crop Images
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formData.imageUrls.length > 0 && (
            <>
              <h6>Current Images</h6>
              <div className="d-flex flex-wrap gap-3 mb-4">
                {formData.imageUrls.map((url, index) => (
                  <div key={index} className="position-relative">
                    <img 
                      src={url} 
                      alt={`Crop ${index + 1}`} 
                      className="img-thumbnail" 
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/100?text=Image+Not+Found';
                      }}
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      className="position-absolute top-0 end-0 rounded-circle p-1"
                      onClick={() => removeImage(index)}
                    >
                      <FaTrash size={10} />
                    </Button>
                  </div>
                ))}
              </div>
              <hr />
            </>
          )}
          
          <div className="mb-4">
            <h6>Add New Image URL</h6>
            <InputGroup>
              <InputGroup.Text>
                <FaLink />
              </InputGroup.Text>
              <Form.Control
                type="url"
                placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
              />
              <Button 
                variant="success" 
                onClick={addImageUrl}
                disabled={!newImageUrl.trim()}
              >
                <FaPlus className="me-2" />
                Add URL
              </Button>
            </InputGroup>
            <small className="text-muted">Enter full URL including http:// or https://</small>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CropFormPage;






























