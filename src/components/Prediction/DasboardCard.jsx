import { Container, Row, Col, Card, Button, Tab, Tabs, Alert } from 'react-bootstrap';
import { formatDistanceToNow } from 'date-fns';
import { 
  FaChartLine, 
  FaShoppingCart, 
  FaCalendarAlt, 
  FaTractor, 
  FaMoneyBillWave,
  FaUser
} from 'react-icons/fa';

function DashboardCard({weatherData,latestPredictionInput}){
    return(
        <Card className="shadow-sm mb-4">
        <Card.Body>
          <h4 className="text-success mb-4">
            <FaChartLine className="me-2" />
            Crop Prediction Dashboard
          </h4>
          
          <Row>
            <Col md={6}>
              <Card className="mb-3">
                <Card.Body>
                  <h5>Weather Conditions</h5>
                  {weatherData && (
                    <ul className="list-unstyled">
                      <li>Temperature: {weatherData.temp}°C</li>
                      <li>Humidity: {weatherData.humidity}%</li>
                      <li>Rainfall Probability: {weatherData.rainfall}</li>
                    </ul>
                  )}
                  <Button variant="success" size="sm" className="mt-2">
                    View Detailed Forecast
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-3">
                <Card.Body>
                  <h5>{latestPredictionInput? 'Soil Health':'Optimal Soil Conditions'}</h5>
                  <p className="text-muted">
                 {latestPredictionInput && latestPredictionInput.updatedAt
? `Last tested: ${formatDistanceToNow(new Date(latestPredictionInput.updatedAt), { addSuffix: true })}`
: 'Tested a few Seconds Ago'}
                    </p>
                    {latestPredictionInput? 
                  <ul className="list-unstyled">
                    <li>Nitrogen Level: Medium</li>
                    <li>pH Value: 6.8</li>
                    <li>Moisture: Optimal</li>
                  </ul>:<ul className="list-unstyled">
                    <li>Nitrogen Level: {latestPredictionInput?.nitrogenLevel}</li>
                    <li>pH Value: {latestPredictionInput?.soilPh}</li>
                    <li>Moisture: {latestPredictionInput?.averageHumidity}</li>
                  </ul>}
                  <Button variant="success" size="sm" className="mt-2">
                    Schedule New Test
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="mt-3">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Recommended Crops</h5>
                <Button variant="outline-success" size="sm">
                  Get New Prediction
                </Button>
              </div>
              
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Crop</th>
                      <th>Probability</th>
                      <th>Expected Yield</th>
                      <th>Market Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Rice</td>
                      <td>85%</td>
                      <td>25 quintals/acre</td>
                      <td>₹1850/quintal</td>
                      <td>
                        <Button variant="outline-success" size="sm">
                          View Plan
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>Wheat</td>
                      <td>78%</td>
                      <td>20 quintals/acre</td>
                      <td>₹2100/quintal</td>
                      <td>
                        <Button variant="outline-success" size="sm">
                          View Plan
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td>Maize</td>
                      <td>65%</td>
                      <td>30 quintals/acre</td>
                      <td>₹1750/quintal</td>
                      <td>
                        <Button variant="outline-success" size="sm">
                          View Plan
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    )
}

export default DashboardCard;