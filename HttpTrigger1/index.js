const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// API URL to monitor
const apiUrl = 'https://64775ba49233e82dd53b8230.mockapi.io/api/v1/posts';

// Function to check for API changes and trigger rebuild for specific pages
async function checkApiChanges() {
  try {
    // Fetch the current data from the API
    const response = await axios.get(apiUrl);
    const currentData = response.data;

    // Read the last fetched data from a file
    const filePath = path.join(__dirname, 'lastData.json');
    let lastData = [];
    if (fs.existsSync(filePath)) {
      lastData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    // Compare the current and last fetched data
    const updatedPageIds = [];
    const unchangedPageIds = [];
    currentData.forEach((currentItem) => {
      const lastItem = lastData.find((item) => item.id === currentItem.id);
      if (!lastItem || JSON.stringify(currentItem) !== JSON.stringify(lastItem)) {
        // Page has changed or is new
        updatedPageIds.push(currentItem.id);
      } else {
        // Page remains unchanged
        unchangedPageIds.push(currentItem.id);
      }
    });

    if (updatedPageIds.length > 0) {
      // Trigger a rebuild for updated pages in Azure Static Web Apps
      console.log('Updated page IDs:', updatedPageIds);
      execSync(`az staticwebapp build --source . --api-changes=${updatedPageIds.join(',')}`);
    } else {
      console.log('No changes in API data.');
    }

    // Save the current data as the last fetched data
    fs.writeFileSync(filePath, JSON.stringify(currentData));
  } catch (error) {
    console.error('Error occurred while checking API changes:', error);
  }
}

// Schedule the API check at a desired interval
setInterval(checkApiChanges, 60000); // Check every minute

// Initial API check on application start
checkApiChanges();
