const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("HealthcareDataManagementModule", (m) => {
  // Deploy AuditTrail
  const auditTrail = m.contract("AuditTrailContract", [], {
    from: m.signer,
  });

  // Deploy ConsentManagement
  const consentManagement = m.contract("ConsentManagement", [], {
    from: m.signer,
  });

  // Deploy PatientData
  const patientData = m.contract("PatientData", [], {
    from: m.signer,
  });

  // Return deployed contracts for use in other modules or for exports
  return { auditTrail, consentManagement, patientData };
});
