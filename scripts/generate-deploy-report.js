const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const getGitInfo = () => {
  try {
    const commitHash = execSync('git rev-parse --short HEAD').toString().trim();
    const commitMessage = execSync('git log -1 --pretty=%B').toString().trim();
    return { commitHash, commitMessage };
  } catch (error) {
    console.error('Error getting git info:', error);
    return {
      commitHash: 'N/A',
      commitMessage: 'N/A: Not in a git repository or git is not available.',
    };
  }
};

const generateReport = () => {
  const gitInfo = getGitInfo();
  
  const report = {
    deploymentDate: new Date().toISOString(),
    ...gitInfo,
  };

  const reportPath = path.join(__dirname, '..', 'public', 'api', 'deploy-report.json');
  
  try {
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`Deployment report generated successfully at ${reportPath}`);
  } catch (error) {
    console.error('Error writing deployment report:', error);
  }
};

generateReport(); 