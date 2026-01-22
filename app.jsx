/* global React, ReactDOM */

// Pull hooks from the global React (since we are not importing from 'react')
const { useState, useEffect, useCallback, useMemo } = React;

/**
 * Icon stubs: your DOCX imports many lucide-react icons.
 * In this no-build approach, we stub them to simple spans so the app runs.
 * You can later replace with inline SVGs or a CDN icon solution.
 */
const __iconNames = [
  "Users","Building2","CalendarCheck","AlertTriangle","ChevronDown","LogOut",
  "TrendingUp","Compass","ClipboardList","Clock","CheckCircle","Home","Calendar",
  "Settings","ArrowLeft","Plus","Trash2","Edit","Save","ArrowBigLeftDash","Download",
  "FileText","ClipboardListIcon","FileWarning","Briefcase","XCircle","CheckSquare",
  "MessageSquare","BarChart3","GraduationCap","ClipboardCheck","ArrowRight",
  "Ambulance","Syringe","Bed","Dumbbell","Utensils","Zap","Shield","BookOpen",
  "Flame","LayoutDashboard","Lock","UserPlus","UserCog","Search","Upload","FileCheck",
  "ChefHat","Printer","Phone","Mail","User","Bell","List"
];

function __IconStub({ label, className }) {
  // keep className so your layout doesn't explode; renders nothing visible except label if you want it
  return React.createElement("span", { className, "data-icon": label, title: label });
}

for (const name of __iconNames) {
  // Define globals matching <Ambulance /> etc.
  // Using var so it becomes a true global in this script context.
  // eslint-disable-next-line no-var
  var _tmp = null;
  window[name] = (props) => __IconStub({ ...props, label: name });
}

// Alias used in your import: ClipboardList as ClipboardListIcon
window.ClipboardListIcon = window.ClipboardList;


//This is the end of the SHIM code. All I do is remove the import from Gemini and paste the rest below. -Brendan




/**
 * CareScope360 Compliance App - Complete Fixed Version  Copyright 2026 CareScope, LLC
 */

// --- CONSTANTS & UTILITY FUNCTIONS ---
const OREGON_SURVEY_CYCLE_MONTHS = 24;
const SURVEY_WINDOW_DURATION_MONTHS = 6;
const MOCK_SURVEY_WINDOW_PREP_MONTHS = 3;
const FRIDAY = 5; 
const TODAY = new Date('2025-12-14').toISOString().split('T')[0]; 

// Initial Data Structures
const MOCK_USER_JANE = { 
    id: 'user-jdoe-001', 
    name: 'Jane Doe, RN', 
    role: 'Regional RN', 
    region: 'Willamette Valley',
    permissions: ['dashboard', 'audits_weekly', 'audits_quarterly', 'pocs', 'reports', 'staff_training']
};
const MOCK_USER_CHRIS = { 
    id: 'user-cmills-001', 
    name: 'Chris Mills', 
    role: 'Corporate QA', 
    region: 'All Regions',
    permissions: ['dashboard', 'audits_weekly', 'audits_quarterly', 'pocs', 'reports', 'staff_training', 'admin', 'fire_drill', 'grievance']
};
const INITIAL_USERS = [
  MOCK_USER_JANE, 
  MOCK_USER_CHRIS, 
  { 
      id: 'user-ssmith-002', 
      name: 'Sarah Smith', 
      role: 'Community Director', 
      region: 'Coast',
      permissions: ['dashboard', 'audits_weekly', 'pocs', 'staff_training']
  }
];
const INITIAL_REGIONS = ['Willamette Valley', 'Coast', 'Central Oregon', 'All Regions'];
const INITIAL_ROLES = ['Regional RN', 'Community Director', 'Corporate QA', 'Health Services Director'];
const AVAILABLE_MODULES = [
    { id: 'dashboard', label: 'Main Dashboard Access' },
    { id: 'audits_weekly', label: 'Weekly Audits' },
    { id: 'audits_quarterly', label: 'Quarterly RN Audits' },
    { id: 'pocs', label: 'POC Management (View & Resolve)' },
    { id: 'staff_training', label: 'Staff Training Module' },
    { id: 'reports', label: 'Reports & Analysis' },
    { id: 'admin', label: 'Administrative Panel (User Mgmt)' },
    { id: 'fire_drill', label: 'Fire Drill Module (Future)' },
    { id: 'grievance', label: 'Grievance Module (Future)' },
    { id: 'survey_compliance', label: 'Survey Entrance/Compliance Items' },
    { id: 'employee_training', label: 'Employee Training (Future)' }
];
const INITIAL_COMMUNITIES = [
    { id: '1', name: 'Van Mall Assisted Living', region: 'Willamette Valley', license: 'ALF', lastSurveyDate: '2024-04-15', edName: 'Sarah Connors', edPhone: '555-0101', edEmail: 'sarah@vanmall.com', nurseName: 'Jessica Day', nursePhone: '555-0102', nurseEmail: 'jessica@vanmall.com' },
    { id: '2', name: 'Powell Valley Assisted Living', region: 'Willamette Valley', license: 'ALF', lastSurveyDate: '2025-01-20', edName: 'Mike Ross', edPhone: '555-0201', edEmail: 'mike@powell.com', nurseName: 'Rachel Zane', nursePhone: '555-0202', nurseEmail: 'rachel@powell.com' },
    { id: '3', name: 'Powell Valley Memory Care', region: 'Willamette Valley', license: 'MC', lastSurveyDate: '2025-01-20', edName: 'Harvey Specter', edPhone: '555-0301', edEmail: 'harvey@powellmc.com', nurseName: 'Donna Paulsen', nursePhone: '555-0302', nurseEmail: 'donna@powellmc.com' },
    { id: '4', name: 'The Cottages Memory Care', region: 'Coast', license: 'MC', lastSurveyDate: '2023-11-01', edName: 'Louis Litt', edPhone: '555-0401', edEmail: 'louis@cottages.com', nurseName: 'Katrina Bennett', nursePhone: '555-0402', nurseEmail: 'katrina@cottages.com' },
    { id: '5', name: 'Mcminnville Memory Care', region: 'WillamAppette Valley', license: 'MC', lastSurveyDate: '2024-09-01', edName: 'Samantha Wheeler', edPhone: '555-0501', edEmail: 'sam@mcminnville.com', nurseName: 'Alex Williams', nursePhone: '555-0502', nurseEmail: 'alex@mcminnville.com' },
    { id: '6', name: 'Evergreen Memory Care', region: 'Coast', license: 'MC', lastSurveyDate: '2024-06-10', edName: 'Robert Zane', edPhone: '555-0601', edEmail: 'robert@evergreenmc.com', nurseName: 'Laura Tanner', nursePhone: '555-0602', nurseEmail: 'laura@evergreenmc.com' },
    { id: '7', name: 'Evergreen Assisted Living', region: 'Coast', license: 'ALF', lastSurveyDate: '2024-06-10', edName: 'Jessica Pearson', edPhone: '555-0701', edEmail: 'jessica@evergreenalf.com', nurseName: 'Jeff Malone', nursePhone: '555-0702', nurseEmail: 'jeff@evergreenalf.com' },
    { id: '8', name: 'Timber Pointe Assisted Living', region: 'Central Oregon', license: 'ALF', lastSurveyDate: '2023-08-05', edName: 'Dana Scott', edPhone: '555-0801', edEmail: 'scottie@timber.com', nurseName: 'Edward Darby', nursePhone: '555-0802', nurseEmail: 'edward@timber.com' },
    { id: '9', name: 'Woodside Assisted Living', region: 'Central Oregon', license: 'ALF', lastSurveyDate: '2025-03-01', edName: 'Daniel Hardman', edPhone: '555-0901', edEmail: 'daniel@woodside.com', nurseName: 'Sheila Sazs', nursePhone: '555-0902', nurseEmail: 'sheila@woodside.com' },
];
const INITIAL_STAFF = [
    { id: 'staff-101', communityId: '1', name: 'Alice Johnson', hireDate: '2024-01-15', position: 'Med Tech' },
    { id: 'staff-102', communityId: '1', name: 'Bob Smith', hireDate: '2025-11-01', position: 'Caregiver' },
    { id: 'staff-401', communityId: '4', name: 'Charlie Davis', hireDate: '2023-05-20', position: 'Caregiver' },
    { id: 'staff-501', communityId: '5', name: 'Denise Green', hireDate: '2024-07-01', position: 'Administrator' },
];
const INITIAL_POC_DATA = [
    { id: 'poc-1-1', communityId: '1', finding: "Overdue medication refusal follow-up in chart QA-29", status: 'Overdue', createdDate: '2025-11-10', targetDate: '2025-12-01', citation: '411-054-0095', risk: 'Clinical' },
    { id: 'poc-1-2', communityId: '1', finding: "Trip hazard found near main entrance QA-3", status: 'Open', createdDate: '2025-12-05', targetDate: '2025-12-15', citation: '411-054-0060', risk: 'Environment' },
    { id: 'poc-2-1', communityId: '2', finding: "Failure to document non-pharmacological interventions for PRN psychotropic use QA-37", status: 'Open', createdDate: '2025-12-10', targetDate: '2026-01-10', citation: '411-054-0105', risk: 'High Risk' },
    { id: 'poc-res-1', communityId: '1', finding: "Old example of environmental hazard", status: 'Resolved', createdDate: '2025-05-01', resolvedDate: '2025-05-10', resolutionNarrative: 'Maintenance ticket completed and hazard removed. Staff re-educated on reporting procedures.', citation: '411-054-0060', risk: 'Environment' },
];
// Fire Drill Data kept for historical record but not used in audits currently
const INITIAL_FIRE_DRILLS = [
    { id: 'drill-1-1', communityId: '1', date: '2025-10-15', time: '14:00', shift: 'Day', origin: 'Kitchen', route: 'Main Exit', problems: 'One resident resisted', evacTime: '5 min', staff: ['Alice', 'Bob'], occupants: 20, status: 'Completed' },
    { id: 'drill-2-1', communityId: '2', date: '2025-11-01', time: '22:00', shift: 'Night', origin: 'Hallway', route: 'Side Exit', problems: 'None', evacTime: '4 min', staff: ['Charlie'], occupants: 15, status: 'Completed' },
    { id: 'drill-4-1', communityId: '4', date: '2025-09-15', time: '08:00', shift: 'Morning', origin: 'Lobby', route: 'Rear Exit', problems: 'Evac time over limit', evacTime: '7 min', staff: ['Denise'], occupants: 18, status: 'Overdue' },
];
const INITIAL_GRIEVANCES = [
    { id: 'g1', communityId: '1', date: '2025-12-10', status: 'Open' },
    { id: 'g2', communityId: '2', date: '2025-11-30', status: 'Resolved' },
    { id: 'g3', communityId: '1', date: '2025-12-05', status: 'Open' },
];
const INITIAL_CHEF_CHATS = [
    { id: 'cc1', communityId: '1', dateOfChat: '2025-11-20', status: 'Active' },
    { id: 'cc2', communityId: '2', dateOfChat: '2025-12-05', status: 'Active' },
];
const MOCK_COMMUNITY_KPI = {
    '1': { weeklyDue: '2025-12-12', quarterlyDue: '2026-03-01', weeklyDashboardLastCompletionDate: '2025-12-05', quarterlyRNLastCompletionDate: '2025-10-01', fireDrillLastDate: '2025-10-15', surveyChecklistLastReviewDate: '2025-12-10' },
    '2': { weeklyDue: '2025-12-19', quarterlyDue: '2026-03-01', weeklyDashboardLastCompletionDate: '2025-11-30', quarterlyRNLastCompletionDate: '2025-11-30', fireDrillLastDate: '2025-11-01', surveyChecklistLastReviewDate: '2025-12-01' },
    '3': { weeklyDue: '2025-12-19', quarterlyDue: '2026-03-01', weeklyDashboardLastCompletionDate: '2025-11-30', quarterlyRNLastCompletionDate: '2025-11-30', fireDrillLastDate: '2025-11-01', surveyChecklistLastReviewDate: '2025-12-05' },
    '4': { weeklyDue: '2025-12-12', quarterlyDue: '2026-01-01', weeklyDashboardLastCompletionDate: '2025-12-01', quarterlyRNLastCompletionDate: '2025-10-01', fireDrillLastDate: '2025-09-15', surveyChecklistLastReviewDate: '2025-10-01' },
    '5': { weeklyDue: '2025-12-19', quarterlyDue: '2026-03-01', weeklyDashboardLastCompletionDate: '2025-11-30', quarterlyRNLastCompletionDate: '2025-12-01', fireDrillLastDate: '2025-12-01', surveyChecklistLastReviewDate: '2025-12-12' },
    '6': { weeklyDue: '2025-12-12', quarterlyDue: '2026-01-01', weeklyDashboardLastCompletionDate: '2025-12-01', quarterlyRNLastCompletionDate: '2025-10-01', fireDrillLastDate: '2025-10-10', surveyChecklistLastReviewDate: '2025-11-20' },
    '7': { weeklyDue: '2025-12-19', quarterlyDue: '2026-03-01', weeklyDashboardLastCompletionDate: '2025-12-01', quarterlyRNLastCompletionDate: '2025-12-01', fireDrillLastDate: '2025-12-01', surveyChecklistLastReviewDate: '2025-12-01' },
    '8': { weeklyDue: '2025-12-12', quarterlyDue: '2026-01-01', weeklyDashboardLastCompletionDate: '2025-12-01', quarterlyRNLastCompletionDate: '2025-10-01', fireDrillLastDate: '2025-08-01', surveyChecklistLastReviewDate: '2025-11-01' },
    '9': { weeklyDue: '2025-12-19', quarterlyDue: '2026-03-01', weeklyDashboardLastCompletionDate: '2025-12-01', quarterlyRNLastCompletionDate: '2025-12-01', fireDrillLastDate: '2025-11-15', surveyChecklistLastReviewDate: '2025-12-08' },
};
const TRAINING_TYPES = [
    { id: 'orientation', name: 'General Orientation', frequency: 'one-time', dueDays: 0, roles: ['Caregiver', 'Med Tech', 'Administrator', 'Health Services Director', 'Activity Director', 'Other'], requiredForLicense: true, isAnnual: false },
    { id: 'pre-service', name: 'Pre-Service / 30-Day Checklist', frequency: 'one-time', dueDays: 30, roles: ['Caregiver', 'Med Tech'], requiredForLicense: true, isAnnual: false },
    { id: 'competency', name: 'Competency Assessment (Role Specific)', frequency: 'one-time', dueDays: 30, roles: ['Med Tech', 'Caregiver'], requiredForLicense: true, isAnnual: false },
    { id: 'annual-inservice', name: 'Annual In-Service (12 Hrs)', frequency: 'annual', roles: ['Caregiver', 'Med Tech', 'Administrator', 'Health Services Director', 'Other'], requiredForLicense: true, isAnnual: true },
    { id: 'dementia-annual', name: 'Annual Dementia (6 Hrs)', frequency: 'annual', roles: ['Caregiver', 'Med Tech', 'Health Services Director', 'Activity Director'], requiredForLicense: true, isAnnual: true }, 
    { id: 'abuse-reporting', name: 'Abuse Reporting / Mandatory Reporter', frequency: 'annual', roles: ['Caregiver', 'Med Tech', 'Administrator', 'Health Services Director', 'Activity Director', 'Other'], requiredForLicense: true, isAnnual: true },
    { id: 'residents-rights', name: 'Residents\' Rights', frequency: 'annual', roles: ['Caregiver', 'Med Tech', 'Administrator', 'Health Services Director', 'Other'], requiredForLicense: true, isAnnual: true },
    { id: 'first-aid', name: 'First Aid Certification', frequency: 'biennial', roles: ['Caregiver', 'Med Tech', 'Administrator', 'Health Services Director'], requiredForLicense: true, isAnnual: false },
    { id: 'cpr', name: 'CPR Certification (Recommended)', frequency: 'biennial', roles: ['Caregiver', 'Med Tech', 'Administrator', 'Health Services Director'], requiredForLicense: false, isAnnual: false },
    { id: 'food-handler', name: 'Food Handler\'s Card', frequency: 'triennial', roles: ['Caregiver', 'Med Tech', 'Dietary'], requiredForLicense: true, isAnnual: false },
    { id: 'lgbtqia-biennial', name: 'Biennial LGBTQIA2S+ Training', frequency: 'biennial', roles: ['Caregiver', 'Med Tech', 'Administrator', 'Health Services Director', 'Other'], requiredForLicense: true, isAnnual: false },
    { id: 'background-check', name: 'Background Check Completed', frequency: 'one-time', dueDays: 0, roles: ['Caregiver', 'Med Tech', 'Administrator', 'Health Services Director', 'Activity Director', 'Other'], requiredForLicense: true, isAnnual: false },
    { id: 'fire-staff-monthly', name: 'Fire/Life Safety Staff Instruction (Alternate Months)', frequency: 'bimonthly', roles: ['Caregiver', 'Med Tech', 'Administrator', 'Health Services Director', 'Other'], requiredForLicense: true, isAnnual: false },
    { id: 'infectious-disease-pre', name: 'Infectious Disease Prevention (Pre-Service)', frequency: 'one-time', dueDays: 0, roles: ['Caregiver', 'Med Tech', 'Administrator', 'Health Services Director', 'Activity Director', 'Other'], requiredForLicense: true, isAnnual: false },
    { id: 'infectious-disease-annual', name: 'Infectious Disease Prevention (Annual)', frequency: 'annual', roles: ['Caregiver', 'Med Tech', 'Administrator', 'Health Services Director', 'Activity Director', 'Other'], requiredForLicense: true, isAnnual: true },
    { id: 'hcbs-pre', name: 'HCBS Training (Pre-Service)', frequency: 'one-time', dueDays: 30, roles: ['Caregiver', 'Med Tech', 'Administrator', 'Health Services Director', 'Activity Director', 'Other'], requiredForLicense: true, isAnnual: false },
    { id: 'hcbs-annual', name: 'HCBS Training (Annual)', frequency: 'annual', roles: ['Caregiver', 'Med Tech', 'Administrator', 'Health Services Director', 'Activity Director', 'Other'], requiredForLicense: true, isAnnual: true },
];
// Entrance Checklist Items (Standard ALF/MC - Covid Omitted)
const SURVEY_ENTRANCE_ITEMS = [
    { id: 'census', name: 'Resident Census Report', desc: 'Current list of all residents with room numbers.' },
    { id: 'staff_roster', name: 'Staff Roster & Schedule', desc: 'Current roster and schedule for past 2 weeks.' },
    { id: 'liability', name: 'Liability Insurance Policy', desc: 'Proof of current liability insurance coverage.' },
    { id: 'admin_license', name: 'Administrator License', desc: 'Copy of current Administrator license/certification.' },
    { id: 'resident_council', name: 'Resident Council Minutes', desc: 'Minutes from the last 3 meetings.' },
    { id: 'grievance_log', name: 'Grievance Log', desc: 'Log of grievances for the past 3 months.' },
    { id: 'menu', name: 'Dining Menu', desc: 'Menu for the current week.' },
    { id: 'emergency_plan', name: 'Emergency/Disaster Plan', desc: 'Current E-Plan and evacuation procedures.' },
    { id: 'floor_plan', name: 'Facility Floor Plan', desc: 'Map identifying exits, fire extinguishers, etc.' },
    { id: 'abuse_policy', name: 'Abuse Policy', desc: 'Current policy on abuse prevention and reporting.' },
];

const addDays = (date, days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate.toISOString().split('T')[0];
};
const addYears = (date, years) => {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + years);
    return newDate.toISOString().split('T')[0];
};
const addMonths = (date, months) => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    if (newDate.getDate() !== new Date(date).getDate()) {
        newDate.setDate(0);
    }
    return newDate.toISOString().split('T')[0];
};
const calculateNextDueDate = (lastCompletedDate, frequencyType) => {
    if (!lastCompletedDate || isNaN(new Date(lastCompletedDate))) return null;
    let nextDue = new Date(lastCompletedDate);
    if (frequencyType === 'Weekly') {
        let finalDue = new Date(lastCompletedDate);
        finalDue.setDate(finalDue.getDate() + 1);
        while (finalDue.getDay() !== FRIDAY) {
            finalDue.setDate(finalDue.getDate() + 1);
        }
        return finalDue.toISOString().split('T')[0];
    } else if (frequencyType === 'Quarterly') {
        nextDue.setMonth(nextDue.getMonth() + 3);
    } else if (frequencyType === 'Annual') {
        nextDue.setFullYear(nextDue.getFullYear() + 1);
    } else if (frequencyType === 'biennial') {
        nextDue.setFullYear(nextDue.getFullYear() + 2);
    } else if (frequencyType === 'triennial') {
        nextDue.setFullYear(nextDue.getFullYear() + 3);
    } else if (frequencyType === 'bimonthly') {
        nextDue.setMonth(nextDue.getMonth() + 2);
    }
    return nextDue.toISOString().split('T')[0];
};
const calculateMockSurveyRequirement = (lastStateSurveyDate) => {
    const lastSurvey = new Date(lastStateSurveyDate);
    if (!lastStateSurveyDate || isNaN(lastSurvey)) return { nextStateWindowStart: null, nextStateWindowEnd: null, mockSurveyRequiredWindow: { start: null, end: null } };
    const nextStateWindowStart = addMonths(lastSurvey, OREGON_SURVEY_CYCLE_MONTHS - SURVEY_WINDOW_DURATION_MONTHS + 3);
    const nextStateWindowEnd = addMonths(nextStateWindowStart, SURVEY_WINDOW_DURATION_MONTHS);
    const mockSurveyRequiredStart = addMonths(nextStateWindowStart, -MOCK_SURVEY_WINDOW_PREP_MONTHS);
    const mockSurveyRequiredEndObj = new Date(nextStateWindowStart);
    mockSurveyRequiredEndObj.setDate(mockSurveyRequiredEndObj.getDate() - 1);
    return {
        nextStateWindowStart: nextStateWindowStart,
        nextStateWindowEnd: nextStateWindowEnd,
        mockSurveyRequiredWindow: { start: mockSurveyRequiredStart, end: mockSurveyRequiredEndObj.toISOString().split('T')[0] }
    };
};
const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A';
const isDateOverdue = (date) => date && new Date(TODAY) > new Date(date);
const isDueSoon = (date) => date && new Date(date) > new Date(TODAY) && new Date(date) <= addDays(new Date(), 30);
const generateRequiredTrainings = (staffMember, communities) => {
    const community = communities.find(c => c.id === staffMember.communityId);
    if (!community) return [];
    
    // Existing completed trainings from the staff record
    const existingTrainings = staffMember.trainings || [];
    const allRequirements = [];
    for (const type of TRAINING_TYPES.filter(t => t.roles.includes(staffMember.position))) {
        // Filter by license type (e.g. Memory Care only)
        if (type.licenseFilter && community.license && !type.licenseFilter.includes(community.license)) continue;
        // Find if this specific staff has a record for this training type
        const record = existingTrainings.find(r => r.trainingId === type.id);
        
        let completionDate = record ? record.completionDate : null;
        let certificateUrl = record ? record.certificateUrl : null;
        let isCompleted = !!completionDate;
        let dueDate = null;
        // Logic to calculate Due Date
        if (type.frequency === 'one-time') {
            dueDate = addDays(staffMember.hireDate, type.dueDays || 0);
            // If one-time and done, it's done forever. If not done, check due date.
        } else {
            // Recurring
            if (isCompleted) {
                // If completed, next due date is based on completion date
                dueDate = calculateNextDueDate(completionDate, type.frequency === 'triennial' ? 'triennial' : (type.frequency === 'biennial' ? 'biennial' : (type.frequency === 'bimonthly' ? 'bimonthly' : 'Annual')));
                // Check if that generated due date is in the past, meaning it expired
                if (isDateOverdue(dueDate)) {
                    isCompleted = false; // It WAS completed, but now it's expired
                }
            } else {
                // Not completed yet? Due date is based on hire date (or today for compliance check)
                // For simplicity in this new staff logic, we'll say due immediately or 30 days from hire
                dueDate = addDays(staffMember.hireDate, 30); 
            }
        }
        allRequirements.push({
            typeId: type.id,
            trainingName: type.name,
            frequency: type.frequency,
            dueDate: dueDate,
            completionDate: completionDate,
            completed: isCompleted,
            certificateUrl: certificateUrl,
            isRecurring: type.isAnnual || type.frequency === 'biennial' || type.frequency === 'triennial' || type.frequency === 'bimonthly'
        });
    }
    return allRequirements;
};
const getTrainingStatus = (training) => {
    if (training.completed) return { status: 'Compliant', color: 'bg-green-100', text: 'text-green-800' };
    if (!training.dueDate) return { status: 'N/A', color: 'bg-gray-100', text: 'text-gray-600' };
    if (isDateOverdue(training.dueDate)) return { status: 'Overdue', color: 'bg-red-100', text: 'text-red-800' };
    if (isDueSoon(training.dueDate)) return { status: 'Due Soon', color: 'bg-yellow-100', text: 'text-yellow-800' };
    return { status: 'Pending', color: 'bg-gray-100', text: 'text-gray-600' };
};
// --- DEFAULT CONFIGURATION ---
const AUDIT_DATA_CONFIG = {
    'WEEKLY_DASHBOARD': {
        name: "Weekly Dashboard Review",
        compliance_labels: { MET: 'Yes', NOT_MET: 'No' }, 
        sections: [
            { title: "Clinical Risk & High Priority", icon: <Ambulance className="w-5 h-5"/>, items: [
                { id: 'wd1', task: "New Wounds (Stage II+) discovered this week?", input: 'yes/no-reverse', oar: "411-054-0110" },
                { id: 'wd2', task: "Any holes in the MARs for the week?", input: 'yes/no-reverse', oar: "411-054-0095" },
                { id: 'wd3', task: "All POC tasks for High-Risk Citations (Rights/Abuse) completed on time?", input: 'yes/no', oar: "N/A" },
                { id: 'wd4', task: "All staff incidents (IRs) entered/reviewed within 24 hours?", input: 'yes/no', oar: "411-054-0080" },
                { id: 'wd5', task: "Any missed medications this week?", input: 'yes/no-reverse', oar: "411-054-0095" },
                { id: 'wd6', task: "Any medications not available this week?", input: 'yes/no-reverse', oar: "411-054-0095" },
                { id: 'wd7', task: "Any residents missing PRN parameters (Audit 5)?", input: 'yes/no-reverse', oar: "411-054-0105" },
                { id: 'wd8', task: "Any medication errors this week?", input: 'yes/no-reverse', oar: "411-054-0095" },
                { id: 'wd9', task: "Are high risk meetings being held?", input: 'yes/no', oar: "N/A" },
                { id: 'wd10', task: "Weekly wound notes completed?", input: 'yes/no', oar: "411-054-0110" },
                { id: 'wd11', task: "Are change of condition notes being written weekly?", input: 'yes/no', oar: "411-054-0085" },
            ]},
        ]
    },
    'QUARTERLY_RN': {
        name: "Quarterly RN/Ops Visit",
        compliance_labels: { MET: 'Met', NOT_MET: 'Not Met' },
        sections: [
            { title: "Community Walk Through", icon: <Building2 className="w-5 h-5"/>, items: [
                { id: 'qr_cwt1', task: "Conduct Brief Walkthrough Of Community: Furnishings, Carpet, Flooring, Walls & Equipment In Good Repair?", input: 'met/not', oar: "411-054-0040" },
                { id: 'qr_cwt2', task: "Required Postings: Ombudsman, License, Previous Survey, Resident Rights, Staffing Plan. ", input: 'met/not', oar: "411-054-0045" },
                { id: 'qr_cwt3', task: "Walk Outside Building. Are There Trip Hazards? Is Structure In Good Repair? ", input: 'met/not', oar: "411-054-0060" },
            ]},
            { title: "Life Enrichment", icon: <BookOpen className="w-5 h-5"/>, items: [
                { id: 'qr_le1', task: "Review Calendar For Activites That Are Relevant, And Purposeful.", input: 'met/not', oar: "N/A" },
                { id: 'qr_le2', task: "Relevant Exercise Program (e.g. Yoga, Weights)", input: 'met/not', oar: "N/A" },
                { id: 'qr_le3', task: "Activities For Bed Bound Residents? ", input: 'met/not', oar: "N/A" },
                { id: 'qr_le4', task: "Do Memory Care Residents Have Individualized Activitiy plans? ", input: 'met/not', oar: "N/A" },
            ]},
            { title: "Housekeeping & Laundry", icon: <Home className="w-5 h-5"/>, items: [
                { id: 'qr_hl1', task: "If Providing Personal Laundry Is It Care Planned?", input: 'met/not', oar: "N/A" },
                { id: 'qr_hl2', task: "Laundry rooms clean and free of debris (check lint trap)", input: 'met/not', oar: "N/A" },
                { id: 'qr_hl3', task: "Check Housekeeping Carts To Ensure All chemicals in use have a current SDS", input: 'met/not', oar: "411-054-0200" },
                { id: 'qr_hl4', baseText: "Chemical Bottles Properly Labeled .", input: 'met/not', oar: "411-054-0200" },
                { id: 'qr_hl5', task: "Public Restrooms Clean, Well Stocked", input: 'met/not', oar: "411-054-0200" },
            ]},
            { title: "Dining Services", icon: <Utensils className="w-5 h-5"/>, items: [
                { id: 'qr_ds1', task: "Sample Food From Meal Service", input: 'met/not', oar: "N/A" },
                { id: 'qr_ds2', task: "Cleanliness Of The Kitchen And Dining Room", input: 'met/not', oar: "411-054-0200" },
                { id: 'qr_ds3', task: "Snacks Being Provided Are Health", input: 'met/not', oar: "N/A" },
                { id: 'qr_ds4', task: "Monthly Chef Meetings With Minutes", input: 'met/not', oar: "N/A" },
                { id: 'qr_ds5', task: "Temperature Logs (Dishwasher/Freezer/Fridge) checked.", input: 'met/not', oar: "N/A" },
            ]},
            { title: "Medication Room/ Clinical", icon: <Syringe className="w-5 h-5"/>, items: [
                { id: 'qr_mc1', task: "Medication Room Secured?", input: 'met/not', oar: "411-054-0055" },
                { id: 'qr_mc2', task: "Med Fridge Clean? Monitoring Temps 36-46 Degrees?", input: 'met/not', oar: "411-054-0055" },
                { id: 'qr_mc3', task: "Zero Expired Medications or Biologicals found in med room or on carts?", input: 'met/not', oar: "411-054-0055" },
                { id: 'qr_mc4', task: "Narcotic Documentation Accurate? Count Verfied and Signatures Present?", input: 'met/not', oar: "411-054-0055" },
                { id: 'qr_mc5', task: "MAR/TAR Audit: 3-5 Charts checked for documentation accuracy.", input: 'met/not', oar: "411-054-0055" },
                { id: 'qr_mc6', task: "Audit Follow-Up On Meds Not Available & Verify MD Notifications For Refused Meds", input: 'met/not', oar: "411-054-0055" },
                { id: 'qr_mc7', task: "Missed Meds addressed by HSD & RCC", input: 'met/not', oar: "411-054-0055" },
                { id: 'qr_mc8', task: "Residents Have Photos in PCC?", input: 'met/not', oar: "N/A" },
                { id: 'qr_mc9', task: "Community Appropriately Using 24-Hour Binder", input: 'met/not', oar: "N/A" },
                { id: 'qr_mc10', task: "Staff Appropriatly Documenting For Alert Charting", input: 'met/not', oar: "411-054-0040" },
                { id: 'qr_mc11', task: "HSD Documenting Assessments And Resolution For Short-Term COC", input: 'met/not', oar: "411-054-0040" },
                { id: 'qr_mc12', task: "Community Conducting Weekly Resident High Risk Meetings With Documentation Completed", input: 'met/not', oar: "N/A" },
                { id: 'qr_mc13', task: "Audit 3-5 Residents To Ensure PRN Parameters Are Present & Accurate. ", input: 'met/not', oar: "411-054-0055" },
                { id: 'qr_mc14', task: "Wounds Being Reviewed Weekly? ", input: 'met/not', oar: "411-054-0110" },
                { id: 'qr_mc15', task: "Audit 3-5 Resident To Ensure Non-Pharm Interventions Present for PRN-Psychotropic Medications. ", input: 'met/not', oar: "411-054-0105" },
            ]},
            { title: "Administrative & General", icon: <ClipboardCheck className="w-5 h-5"/>, items: [
                { id: 'qr_ag1', task: "All staff in appropriate uniforms with name badges", input: 'met/not', oar: "411-054-0070" },
                { id: 'qr_ag2', task: "Survey Binder current", input: 'met/not', oar: "411-054-0045" },
                { id: 'qr_ag3', task: "Review Last Mock Survey and POC or State Survey & POC", input: 'met/not', oar: "N/A" },
            ]},
            { title: "Staff Education/Staffing Hours", icon: <GraduationCap className="w-5 h-5"/>, items: [
                { id: 'qr_se1', task: "General Orientation following P/P", input: 'met/not', oar: "411-054-0070" },
                { id: 'qr_se2', task: "New Hire Relias Training Complete", input: 'met/not', oar: "411-054-0070" },
                { id: 'qr_se3', task: "New Hire Skill Check Off Complete", input: 'met/not', oar: "411-054-0070" },
                { id: 'qr_se4', task: "Annual Relias Training Upto Date", input: 'met/not', oar: "411-054-0070" },
            ]},
            { title: "Team Visit", icon: <Users className="w-5 h-5"/>, items: [
                { id: 'qr_tv1', task: "Coach and train Management Team members", input: 'met/not', oar: "N/A" },
                { id: 'qr_tv2', task: "Observe and/or follow-up from previous site visit", input: 'met/not', oar: "N/A" },
                { id: 'qr_tv3', task: "Exit with Management Team", input: 'met/not', oar: "N/A" },
            ]}
        ]
    },
    'MOCK_SURVEY': {
        name: "Mock Survey Inspection",
        compliance_labels: { MET: 'Met', NOT_MET: 'Not Met' },
        sections: [
            { title: "Resident Rights & Abuse Prevention", icon: <Shield className="w-5 h-5"/>, items: [
                { id: 'ms1', task: "Are residents treated with dignity and respect (OAR 411-054-0027)?", input: 'met/not', oar: "411-054-0027" },
                { id: 'ms2', task: "Is the Abuse Reporting poster displayed in a conspicuous location?", input: 'met/not', oar: "411-054-0025" },
                { id: 'ms3', task: "Are substantiated abuse findings reported to the licensing agency immediately?", input: 'met/not', oar: "411-054-0028" },
                { id: 'ms4', task: "Do residents have privacy in their rooms and during care?", input: 'met/not', oar: "411-054-0027" },
            ]},
            { title: "Resident Care & Services", icon: <Users className="w-5 h-5"/>, items: [
                { id: 'ms5', task: "Are service plans current and updated quarterly (OAR 411-054-0036)?", input: 'met/not', oar: "411-054-0036" },
                { id: 'ms6', task: "Do service plans reflect the actual needs and preferences of the resident?", input: 'met/not', oar: "411-054-0036" },
                { id: 'ms7', task: "Are change of condition notes documented and followed up on?", input: 'met/not', oar: "411-054-0040" },
            ]},
            { title: "Medications & Treatments", icon: <Syringe className="w-5 h-5"/>, items: [
                { id: 'ms8', task: "Are MARs accurate and up-to-date (OAR 411-054-0055)?", input: 'met/not', oar: "411-054-0055" },
                { id: 'ms9', task: "Are medications stored securely and at proper temperatures?", input: 'met/not', oar: "411-054-0055" },
                { id: 'ms10', task: "Are PRN psychotropic medications used only with specific parameters?", input: 'met/not', oar: "411-054-0055" },
            ]},
            { title: "Physical Environment", icon: <Building2 className="w-5 h-5"/>, items: [
                { id: 'ms11', task: "Is the facility clean, sanitary, and free of odors?", input: 'met/not', oar: "411-054-0200" },
                { id: 'ms12', task: "Are exits unobstructed and accessible?", input: 'met/not', oar: "411-054-0200" },
                { id: 'ms13', task: "Are chemicals and toxins stored securely?", input: 'met/not', oar: "411-054-0200" },
            ]},
             { title: "Staffing & Training", icon: <GraduationCap className="w-5 h-5"/>, items: [
                { id: 'ms14', task: "Is the staffing plan posted and accurate?", input: 'met/not', oar: "411-054-0070" },
                { id: 'ms15', task: "Are all staff current on mandatory abuse reporting training?", input: 'met/not', oar: "411-054-0070" },
                { id: 'ms16', task: "Are dementia training hours met for all direct care staff?", input: 'met/not', oar: "411-054-0070" },
            ]}
        ]
    }
};

// --- COMPONENT DEFINITIONS ---

// NEW COMPONENT: AuditTemplateManager
const AuditTemplateManager = ({ auditTemplates, setAuditTemplates }) => {
    const [selectedTemplateKey, setSelectedTemplateKey] = useState('WEEKLY_DASHBOARD');
    const [editingSection, setEditingSection] = useState(null); // { index, title }
    const [editingItem, setEditingItem] = useState(null); // { sectionIndex, itemIndex, ...data }
    const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);

    const currentTemplate = auditTemplates[selectedTemplateKey];

    const handleSaveSection = () => {
        if (!editingSection?.title) return;
        setAuditTemplates(prev => {
            const newTemplates = { ...prev };
            const sections = [...newTemplates[selectedTemplateKey].sections];
            
            if (editingSection.index !== undefined) {
                // Edit existing
                sections[editingSection.index] = { ...sections[editingSection.index], title: editingSection.title };
            } else {
                // Add new
                sections.push({ title: editingSection.title, icon: null, items: [] });
            }
            
            newTemplates[selectedTemplateKey] = { ...newTemplates[selectedTemplateKey], sections };
            return newTemplates;
        });
        setIsSectionModalOpen(false);
        setEditingSection(null);
    };

    const handleDeleteSection = (index) => {
        if (!window.confirm("Are you sure? This will delete the section and all its questions.")) return;
        setAuditTemplates(prev => {
            const newTemplates = { ...prev };
            const sections = newTemplates[selectedTemplateKey].sections.filter((_, i) => i !== index);
            newTemplates[selectedTemplateKey] = { ...newTemplates[selectedTemplateKey], sections };
            return newTemplates;
        });
    };

    const handleSaveItem = () => {
        if (!editingItem?.task) return;
        setAuditTemplates(prev => {
            const newTemplates = { ...prev };
            const sections = [...newTemplates[selectedTemplateKey].sections];
            const section = { ...sections[editingItem.sectionIndex] };
            const items = [...section.items];

            const newItemData = {
                id: editingItem.id || `custom-${Date.now()}`,
                task: editingItem.task,
                input: editingItem.input,
                oar: editingItem.oar || 'N/A'
            };

            if (editingItem.itemIndex !== undefined) {
                // Edit existing
                items[editingItem.itemIndex] = newItemData;
            } else {
                // Add new
                items.push(newItemData);
            }

            section.items = items;
            sections[editingItem.sectionIndex] = section;
            newTemplates[selectedTemplateKey] = { ...newTemplates[selectedTemplateKey], sections };
            return newTemplates;
        });
        setIsItemModalOpen(false);
        setEditingItem(null);
    };

    const handleDeleteItem = (sectionIndex, itemIndex) => {
        if (!window.confirm("Delete this question?")) return;
        setAuditTemplates(prev => {
            const newTemplates = { ...prev };
            const sections = [...newTemplates[selectedTemplateKey].sections];
            const section = { ...sections[sectionIndex] };
            section.items = section.items.filter((_, i) => i !== itemIndex);
            sections[sectionIndex] = section;
            newTemplates[selectedTemplateKey] = { ...newTemplates[selectedTemplateKey], sections };
            return newTemplates;
        });
    };

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gray-50">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <ClipboardList className="w-6 h-6 mr-2 text-indigo-600"/>
                    Audit Template Manager
                </h3>
                <div className="flex gap-2 overflow-x-auto">
                    {Object.keys(auditTemplates).map(key => (
                        <button
                            key={key}
                            onClick={() => setSelectedTemplateKey(key)}
                            className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-colors ${
                                selectedTemplateKey === key 
                                    ? 'bg-indigo-600 text-white shadow-sm' 
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                            }`}
                        >
                            {auditTemplates[key].name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-lg font-bold text-gray-700">Sections & Questions</h4>
                    <button 
                        onClick={() => { setEditingSection({}); setIsSectionModalOpen(true); }}
                        className="flex items-center px-3 py-1.5 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700"
                    >
                        <Plus className="w-4 h-4 mr-1.5"/> Add Section
                    </button>
                </div>

                <div className="space-y-6">
                    {currentTemplate.sections.map((section, sIdx) => (
                        <div key={sIdx} className="border border-gray-200 rounded-xl overflow-hidden">
                            <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-b border-gray-200">
                                <div className="font-bold text-gray-800 flex items-center gap-2">
                                    <span className="bg-indigo-100 text-indigo-700 w-6 h-6 flex items-center justify-center rounded-full text-xs">
                                        {sIdx + 1}
                                    </span>
                                    {section.title}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => { setEditingSection({ index: sIdx, title: section.title }); setIsSectionModalOpen(true); }}
                                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                                    >
                                        <Edit className="w-4 h-4"/>
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteSection(sIdx)}
                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                                    >
                                        <Trash2 className="w-4 h-4"/>
                                    </button>
                                    <button 
                                        onClick={() => { setEditingItem({ sectionIndex: sIdx, task: '', input: 'yes/no' }); setIsItemModalOpen(true); }}
                                        className="ml-2 flex items-center px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded hover:bg-indigo-100"
                                    >
                                        <Plus className="w-3 h-3 mr-1"/> Add Question
                                    </button>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {section.items.map((item, iIdx) => (
                                    <div key={item.id} className="p-4 hover:bg-gray-50 flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900 text-sm">{item.task}</p>
                                            <div className="flex gap-3 mt-1 text-xs text-gray-500">
                                                <span className="bg-gray-100 px-1.5 py-0.5 rounded">Type: {item.input}</span>
                                                {item.oar && <span className="bg-gray-100 px-1.5 py-0.5 rounded">OAR: {item.oar}</span>}
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <button 
                                                onClick={() => { setEditingItem({ sectionIndex: sIdx, itemIndex: iIdx, ...item }); setIsItemModalOpen(true); }}
                                                className="text-gray-400 hover:text-blue-600 p-1"
                                            >
                                                <Edit className="w-3.5 h-3.5"/>
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteItem(sIdx, iIdx)}
                                                className="text-gray-400 hover:text-red-600 p-1"
                                            >
                                                <Trash2 className="w-3.5 h-3.5"/>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {section.items.length === 0 && (
                                    <div className="p-4 text-center text-gray-400 text-sm italic">No questions in this section.</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Section Modal */}
            {isSectionModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                        <h3 className="text-xl font-bold mb-4">{editingSection.index !== undefined ? 'Edit Section' : 'New Section'}</h3>
                        <input
                            type="text"
                            value={editingSection.title || ''}
                            onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg p-2.5 mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
                            placeholder="Section Title"
                            autoFocus
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setIsSectionModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-bold">Cancel</button>
                            <button onClick={handleSaveSection} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700">Save</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Item Modal */}
            {isItemModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
                        <h3 className="text-xl font-bold mb-4">{editingItem.itemIndex !== undefined ? 'Edit Question' : 'New Question'}</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Question / Task</label>
                                <textarea
                                    value={editingItem.task || ''}
                                    onChange={(e) => setEditingItem({ ...editingItem, task: e.target.value })}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    rows={3}
                                    placeholder="Enter the audit question..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Input Type</label>
                                    <select
                                        value={editingItem.input || 'yes/no'}
                                        onChange={(e) => setEditingItem({ ...editingItem, input: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                                    >
                                        <option value="yes/no">Yes = Compliant / No = Issue</option>
                                        <option value="yes/no-reverse">Yes = Issue / No = Compliant</option>
                                        <option value="met/not">Met / Not Met</option>
                                        <option value="text">Text Narrative Only</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">OAR / Regulation (Optional)</label>
                                    <input
                                        type="text"
                                        value={editingItem.oar || ''}
                                        onChange={(e) => setEditingItem({ ...editingItem, oar: e.target.value })}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        placeholder="e.g. 411-054-0020"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <button onClick={() => setIsItemModalOpen(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-bold">Cancel</button>
                            <button onClick={handleSaveItem} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700">Save Question</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Modified MobileAudit to accept auditTemplates
const MobileAudit = ({ community, user, auditType, auditData, setAuditData, setIsAuditMode, completeAudit, auditTemplates }) => {
    // MODIFIED: Use passed auditTemplates prop instead of AUDIT_DATA_CONFIG
    const config = auditTemplates[auditType] || auditTemplates['WEEKLY_DASHBOARD'];
    const [showConfirm, setShowConfirm] = useState(false);

    // Helper to safely render icons if they exist and are valid elements
    const renderSectionIcon = (icon) => {
        if (React.isValidElement(icon)) return icon;
        return null; // Fallback or empty if icon was lost in persistence
    };

    const handleInitialSubmit = () => {
        if (auditType === 'WEEKLY_DASHBOARD') {
            setShowConfirm(true);
        } else {
            completeAudit(auditType, community.id, auditData);
            setIsAuditMode(false);
        }
    };

    const handleConfirmSubmit = () => {
        completeAudit(auditType, community.id, auditData);
        setIsAuditMode(false);
        setShowConfirm(false);
    };

    // Helper to determine button behavior based on input type
    const getButtons = (item) => {
        // Standard "Yes = Good", "No = Bad"
        if (item.input === 'yes/no') {
             return [
                 { label: 'Yes', value: false, className: auditData[item.id]?.poc_needed === false ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200' },
                 { label: 'No', value: true, className: auditData[item.id]?.poc_needed === true ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-600 border-gray-200' }
             ];
        }
        // Reverse "Yes = Bad" (e.g. "Any Wounds?"), "No = Good"
        if (item.input === 'yes/no-reverse') {
            return [
                { label: 'Yes', value: true, className: auditData[item.id]?.poc_needed === true ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-600 border-gray-200' },
                { label: 'No', value: false, className: auditData[item.id]?.poc_needed === false ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200' }
            ];
        }
        // Met/Not Met logic (Quarterly/Fire)
        return [
            { label: 'Met', value: false, className: auditData[item.id]?.poc_needed === false ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-200' },
            { label: 'Not Met', value: true, className: auditData[item.id]?.poc_needed === true ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-600 border-gray-200' }
        ];
    };
    return (
        <div className="max-w-3xl mx-auto p-4 pb-20">
            {/* ... existing code ... */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6 sticky top-0 z-20 border-b border-indigo-100">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{config.name}</h2>
                        <p className="text-base text-gray-500">{community.name}</p>
                    </div>
                    <button onClick={() => setIsAuditMode(false)} className="text-gray-400 hover:text-gray-600"><XCircle /></button>
                </div>
            </div>
            <div className="space-y-6">
                {config.sections.map((section, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-sm p-6">
                        {/* MODIFIED: Safe icon rendering */}
                        <h3 className="font-bold text-xl text-indigo-800 mb-4 flex items-center gap-2">
                            {renderSectionIcon(section.icon)} {section.title}
                        </h3>
                        <div className="space-y-4">
                            {section.items.map(item => {
                                if (item.input === 'text') {
                                    return (
                                        <div key={item.id} className="border-b border-gray-100 pb-4 last:border-0">
                                            <p className="text-base font-medium text-gray-900 mb-2">{item.task}</p>
                                            <textarea 
                                                className="w-full border border-gray-200 rounded-lg p-3 text-base focus:ring-2 focus:ring-indigo-500 outline-none min-h-[100px] bg-gray-50/50 shadow-inner"
                                                placeholder="Enter clinical findings or action plan notes..."
                                                value={auditData[item.id]?.narrative || ''}
                                                onChange={(e) => setAuditData(prev => ({ ...prev, [item.id]: { ...item, narrative: e.target.value } }))}
                                            />
                                        </div>
                                    );
                                }
                                const buttons = getButtons(item);
                                return (
                                    <div key={item.id} className="border-b border-gray-100 pb-4 last:border-0">
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="text-base font-medium text-gray-900">{item.task}</p>
                                            {item.oar && <span className="text-sm text-gray-400 ml-2 whitespace-nowrap">OAR {item.oar}</span>}
                                        </div>
                                        <div className="flex gap-2">
                                            {buttons.map((btn, i) => (
                                                <button 
                                                    key={i}
                                                    onClick={() => setAuditData(prev => ({ ...prev, [item.id]: { ...item, poc_needed: btn.value } }))}
                                                    className={`flex-1 py-2 rounded-lg text-base font-bold border ${btn.className}`}
                                                >
                                                    {btn.label}
                                                </button>
                                            ))}
                                        </div>
                                        {auditData[item.id]?.poc_needed === true && (
                                            <div className="mt-3 animate-in fade-in slide-in-from-top-1">
                                                <label className="block text-sm font-bold text-red-700 mb-1">
                                                    <AlertTriangle className="w-4 h-4 inline mr-1" />
                                                    Deficiency Explanation Required:
                                                </label>
                                                <textarea
                                                    className="w-full border border-red-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-500 outline-none bg-red-50"
                                                    placeholder="Please document why this item is not in compliance..."
                                                    value={auditData[item.id]?.narrative || ''}
                                                    onChange={(e) => setAuditData(prev => ({ 
                                                        ...prev, 
                                                        [item.id]: { ...prev[item.id], narrative: e.target.value } 
                                                    }))}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
            {/* ... existing code ... */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 z-30">
                <div className="max-w-3xl mx-auto flex gap-4">
                    <button onClick={() => setIsAuditMode(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl">Cancel</button>
                    <button onClick={handleInitialSubmit} className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg">Submit Audit</button>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirm && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95">
                        <div className="flex flex-col items-center text-center mb-6">
                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                                <FileCheck className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Confirm Submission</h3>
                            <p className="text-gray-500 mt-2">Are you sure you want to submit the Weekly Dashboard Review for {community.name}?</p>
                        </div>
                        <div className="flex gap-3">
                            <button 
                                onClick={() => setShowConfirm(false)} 
                                className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleConfirmSubmit} 
                                className="flex-1 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Confirm Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// FIXED: RenderSurveyCard - removed incorrect nested AdminPanel definition
const RenderSurveyCard = ({ title, start, end, isMock = false, onClick }) => {
    const todayMs = new Date(TODAY).getTime(); // Ensure todayMs is defined
    const startMs = new Date(start).getTime();
    const endMs = new Date(end).getTime();
    let statusText = '', statusClass = 'text-gray-600 border-gray-400 bg-gray-50';
    if (todayMs >= startMs && todayMs <= endMs) {
        statusText = isMock ? 'ACTION REQUIRED: MUST COMPLETE MOCK SURVEY' : 'STATE SURVEY WINDOW IS OPEN';
        statusClass = isMock ? 'text-red-800 border-red-600 bg-red-200 animate-pulse' : 'text-yellow-800 border-yellow-600 bg-yellow-100';
    } else if (todayMs < startMs) {
        statusText = `Opens in ${Math.ceil((startMs - todayMs) / (1000 * 60 * 60 * 24) / 30)} months`;
        statusClass = 'text-indigo-800 border-indigo-600 bg-indigo-100';
    } else { 
        statusText = "Window Closed"; 
    }
    return (
        <div 
            onClick={isMock ? onClick : undefined}
            className={`p-4 sm:p-6 rounded-2xl border-4 ${statusClass} shadow-xl mb-4 ${isMock ? 'cursor-pointer hover:bg-red-50 transition-colors' : ''}`}
        >
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <div className="flex justify-between items-center text-lg sm:text-xl font-medium">
                <div><p className="text-sm uppercase text-gray-500">Start Date</p><p className="font-extrabold">{formatDate(start)}</p></div>
                <div className="text-2xl sm:text-4xl font-thin mx-2 sm:mx-4">→</div>
                <div><p className="text-sm uppercase text-gray-500">End Date</p><p className="font-extrabold">{formatDate(end)}</p></div>
            </div>
            <p className="mt-4 text-center font-bold text-base bg-white/50 p-2 rounded-lg">{statusText}</p>
        </div>
    );
};

const MultiCommunityDashboard = ({ activeRegionTab, setActiveRegionTab, setActiveCommunityId, user, communities, handleDirectAuditStart, totalOpenPOCS, totalOverduePOCS, totalHighRisk, kpis, completedAudits }) => {
    // Filter communities based on user role/region
    const relevantCommunities = useMemo(() => {
        if (user.role === 'Corporate QA') return communities;
        return communities.filter(c => c.region === user.region);
    }, [user, communities]);
    
    const regionTabs = useMemo(() => {
        const uniqueRegions = [...new Set(relevantCommunities.map(c => c.region))];
        return ['All Regions', ...uniqueRegions];
    }, [relevantCommunities]);

    const filteredCommunities = useMemo(() => {
        if (activeRegionTab === 'All Regions') return relevantCommunities;
        return relevantCommunities.filter(c => c.region === activeRegionTab);
    }, [activeRegionTab, relevantCommunities]);

    const pocMetrics = App.pocMetrics || {};

    // --- Regional Data Calculation for Dashboard Chart ---
    const regionalData = useMemo(() => {
        const regions = [...new Set(communities.map(c => c.region))];
        return regions.map(region => {
            const regionCommunities = communities.filter(c => c.region === region);
            
            // Calculate Composite Scores
            let totalComplianceScore = 0;
            
            const stats = regionCommunities.reduce((acc, c) => {
                // --- NEW SCORING LOGIC ---
                // Find latest audit results from completedAudits
                const latestWeekly = completedAudits
                    .filter(a => a.communityId === c.id && a.type === 'WEEKLY_DASHBOARD')
                    .sort((a,b) => b.date.localeCompare(a.date))[0];
                const latestQuarterly = completedAudits
                    .filter(a => a.communityId === c.id && a.type === 'QUARTERLY_RN')
                    .sort((a,b) => b.date.localeCompare(a.date))[0];

                const weeklyScore = latestWeekly ? latestWeekly.compliancePct : 0;
                const quarterlyScore = latestQuarterly ? latestQuarterly.compliancePct : 0;
                
                const kpi = kpis?.[c.id] || {};
                const isQuarterlyOverdue = isDateOverdue(calculateNextDueDate(kpi.quarterlyRNLastCompletionDate || TODAY, 'Quarterly'));
                const finalQuarterlyScore = isQuarterlyOverdue ? 0 : quarterlyScore;

                const communityCompliance = Math.round((weeklyScore * 0.4) + (finalQuarterlyScore * 0.6));
                // -------------------------

                totalComplianceScore += communityCompliance;
                acc.communitiesCount++;
                return acc;
            }, { region, communitiesCount: 0 });
            
            stats.complianceScore = Math.round(totalComplianceScore / (regionCommunities.length || 1));
            return stats;
        });
    }, [communities, pocMetrics, kpis, completedAudits]);

    const getCommunityRiskColor = (c, dynamicPocKpi) => {
        const kpi = kpis[c.id] || {};
        const combinedKpi = { ...kpi, ...dynamicPocKpi };
        
        const isWeeklyOverdue = isDateOverdue(calculateNextDueDate(kpi.weeklyDashboardLastCompletionDate || TODAY, 'Weekly'));
        const isQuarterlyOverdue = isDateOverdue(calculateNextDueDate(kpi.quarterlyRNLastCompletionDate || TODAY, 'Quarterly'));
        
        let status = 'Compliant';
        let color = 'bg-white border-gray-200';
        
        if (combinedKpi.overduePOCS > 0 || combinedKpi.highRisk > 0 || isWeeklyOverdue || isQuarterlyOverdue) {
            status = 'Critical Attention Needed';
            color = 'bg-red-100 border-red-300';
        } else if (combinedKpi.openPOCS > 5 || isDueSoon(kpi.weeklyDue)) {
            status = 'Warning';
            color = 'bg-yellow-50 border-yellow-300';
        }
        return { color, status, combinedKpi, kpi };
    };
    return (
        <div className="p-4 sm:p-8 min-h-screen bg-gray-50">
            <h1 className="text-5xl font-extrabold text-indigo-800 mb-6 border-b pb-2">
                Corporate / Regional Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <button 
                    onClick={() => handleDirectAuditStart('HISTORY', 'POC_OPEN')} 
                    className="p-6 bg-gray-200 rounded-xl shadow-lg border-l-4 border-red-500 text-left transition hover:bg-gray-300"
                >
                    <p className="text-base font-semibold text-gray-500 uppercase">Total Open POCs</p>
                    <p className="text-5xl font-extrabold text-red-600">{totalOpenPOCS}</p>
                    <p className="text-sm text-gray-500 font-bold mt-1">({totalOverduePOCS} Overdue) - CLICK FOR DETAILS</p>
                </button>
                
                <button 
                    onClick={() => handleDirectAuditStart('HISTORY', 'POC_HIGH_RISK')} 
                    className="p-6 bg-gray-200 rounded-xl shadow-lg border-l-4 border-yellow-500 text-left transition hover:bg-gray-300"
                >
                    <p className="text-base font-semibold text-gray-500 uppercase">High-Risk Citations</p>
                    <p className="text-5xl font-extrabold text-yellow-600">{totalHighRisk}</p>
                    <p className="text-sm text-gray-500 font-bold mt-1">Rights, Abuse, Infection Control</p>
                </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <BarChart3 className="w-6 h-6 mr-2 text-indigo-600"/>
                    Regional Compliance Index (Real-Time)
                </h3>
                <div className="space-y-6">
                    {regionalData.map((data, index) => (
                        <div key={index} className="relative">
                            <div className="flex justify-between mb-1">
                                <span className="text-base font-bold text-gray-700">{data.region}</span>
                                <span className="text-base font-bold text-gray-700">{data.complianceScore}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div 
                                    className={`h-4 rounded-full transition-all duration-1000 ease-out ${
                                        data.complianceScore >= 90 ? 'bg-green-500' : 
                                        data.complianceScore >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${data.complianceScore}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between mt-1 text-sm text-gray-500">
                                <span>Weekly / Quarterly Aggregate</span>
                                <span>{data.communitiesCount} Communities</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mb-6 pt-4 border-t border-gray-200">
                <h2 className="text-4xl font-bold text-indigo-700">Community Risk Overview</h2>
                <div className="mt-4 md:mt-0">
                    <select
                        value={activeRegionTab}
                        onChange={(e) => setActiveRegionTab(e.target.value)}
                        className="bg-white border border-gray-300 text-gray-700 text-base font-bold rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 shadow-sm min-w-[200px]"
                    >
                        {regionTabs.map(tab => (
                            <option key={tab} value={tab}>{tab}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCommunities.map(c => {
                    const dynamicPocKpi = pocMetrics.communityPocCounts?.[c.id] || { openPOCS: 0, overduePOCS: 0, highRisk: 0 };
                    const dynamicFireKpi = pocMetrics.fireMetrics?.[c.id] || { overdueDrills: 0 };
                    const dynamicGrievanceKpi = pocMetrics.grievanceMetrics?.[c.id] || { openCount: 0, overdueCount: 0 };
                    const dynamicChefChatKpi = pocMetrics.chefChatMetrics?.[c.id] || { isOverdue: false };
                    const dynamicStaffKpi = pocMetrics.staffTrainingMetrics?.[c.id] || { overdueCount: 0 };
                    const { color, status, combinedKpi, kpi: currentKpiData } = getCommunityRiskColor(c, dynamicPocKpi);
                    
                    const isWeeklyOverdue = isDateOverdue(calculateNextDueDate(currentKpiData.weeklyDashboardLastCompletionDate || TODAY, 'Weekly'));
                    const isQuarterlyOverdue = isDateOverdue(calculateNextDueDate(currentKpiData.quarterlyRNLastCompletionDate || TODAY, 'Quarterly'));
                    
                    const checklistNextDue = currentKpiData.surveyChecklistLastReviewDate ? addMonths(currentKpiData.surveyChecklistLastReviewDate, 1) : null;
                    const isChecklistOverdue = isDateOverdue(checklistNextDue);

                    return (
                        <div key={c.id} className={`p-4 rounded-xl border-2 shadow-md ${color} transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col`}
                             onClick={() => setActiveCommunityId(c.id)}>
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                                    <Compass className="w-5 h-5 mr-2 text-indigo-600" />
                                    {c.name}
                                </h3>
                                <div className={`text-sm font-semibold px-2 py-1 rounded-full ${color.includes('red') ? 'bg-red-500 text-white' : color.includes('yellow') ? 'bg-yellow-500 text-white' : 'bg-green-500 text-white'}`}>
                                    {status === 'Critical Attention Needed' ? 'CRITICAL' : status}
                                </div>
                            </div>
                            <p className="text-base text-gray-600 mb-3">{c.region} - {c.license}</p>
                            <div className="flex flex-col text-base gap-2 mb-4">
                                <div className={isWeeklyOverdue ? "text-red-600 font-bold" : ""}>
                                    <TrendingUp className={`w-4 h-4 inline mr-1 ${isWeeklyOverdue ? 'text-red-600' : 'text-green-500'}`} /> 
                                    Last Weekly: 
                                     <span className="font-bold"> {formatDate(currentKpiData.weeklyDashboardLastCompletionDate)}</span>
                                </div>
                                
                                <div className={isQuarterlyOverdue ? "text-red-600 font-bold" : ""}>
                                    <CalendarCheck className={`w-4 h-4 inline mr-1 ${isQuarterlyOverdue ? 'text-red-600' : 'text-yellow-500'}`} /> 
                                    Quarterly Audit Due: 
                                     <span className="font-bold"> {formatDate(currentKpiData.quarterlyRNLastCompletionDate)}</span>
                                </div>

                                <div className="text-gray-600 font-medium">
                                    <Flame className="w-4 h-4 inline mr-1 text-orange-500" />
                                    Last Fire Drill: 
                                    <span className="font-bold"> {formatDate(currentKpiData.fireDrillLastDate)}</span>
                                </div>

                                <div><AlertTriangle className="w-4 h-4 inline mr-1 text-red-500" /> High Risk: <span className="font-bold">{combinedKpi.highRisk}</span></div>
                                
                                <div><CalendarCheck className="w-4 h-4 inline mr-1 text-indigo-500" /> POCs Open: <span className="font-bold">{combinedKpi.openPOCS}</span></div>

                                <div className={isChecklistOverdue ? "text-red-600 font-bold" : "text-green-600 font-bold"}>
                                    {isChecklistOverdue ? (
                                         <><AlertTriangle className="w-4 h-4 inline mr-1" /> Survey Entrance Checklist Review Overdue</>
                                    ) : (
                                         <><CheckCircle className="w-4 h-4 inline mr-1" /> Survey Entrance Check List Reviewed Monthly</>
                                    )}
                                </div>

                                {dynamicFireKpi.overdueDrills > 0 && <div className="text-red-600 font-bold"><Flame className="w-4 h-4 inline mr-1" /> {dynamicFireKpi.overdueDrills} Overdue Fire Drills</div>}
                                {dynamicStaffKpi.overdueCount > 0 && <div className="text-red-600 font-bold"><GraduationCap className="w-4 h-4 inline mr-1" /> {dynamicStaffKpi.overdueCount} Overdue Staff Trainings</div>}
                                {dynamicChefChatKpi.isOverdue && <div className="text-red-600 font-bold"><ChefHat className="w-4 h-4 inline mr-1" /> Chef Chat Overdue</div>}
                                {dynamicGrievanceKpi.openCount > 0 && <div className={dynamicGrievanceKpi.overdueCount > 0 ? "text-red-600 font-bold" : "text-blue-600 font-bold"}><MessageSquare className="w-4 h-4 inline mr-1" /> {dynamicGrievanceKpi.openCount} Grievances ({dynamicGrievanceKpi.overdueCount} Overdue)</div>}
                            </div>
                            <button 
                                onClick={(e) => { e.stopPropagation(); setActiveCommunityId(c.id); }}
                                className="mt-auto w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md flex items-center justify-center transition-colors"
                            >
                                <LayoutDashboard className="w-4 h-4 mr-2" />
                                Dashboard
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- MISSING MODAL COMPONENTS ADDED HERE ---
const PocResolutionModal = ({ pocId, finding, setMockPocData, setShowModal }) => {
    const [narrative, setNarrative] = useState('');
    const handleResolve = () => {
        if (!narrative.trim()) return;
        setMockPocData(prev => prev.map(p => p.id === pocId ? { ...p, status: 'Resolved', resolvedDate: new Date().toISOString().split('T')[0], resolutionNarrative: narrative } : p));
        setShowModal(null);
    };
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
                <h3 className="text-xl font-bold mb-4">Resolve POC Finding</h3>
                <p className="text-gray-600 text-sm mb-4">{finding}</p>
                <textarea
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none mb-4"
                    rows={4}
                    placeholder="Enter resolution details..."
                    value={narrative}
                    onChange={(e) => setNarrative(e.target.value)}
                />
                <div className="flex justify-end gap-3">
                    <button onClick={() => setShowModal(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-bold">Cancel</button>
                    <button onClick={handleResolve} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700">Submit Resolution</button>
                </div>
            </div>
        </div>
    );
};

const ResolutionNarrativeModal = ({ data, onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-bold mb-4">Resolution Details</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{data.narrative}</p>
            <div className="mt-6 flex justify-end">
                <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300">Close</button>
            </div>
        </div>
    </div>
);

const AuditHistoryView = ({ activeCommunity, currentCommunityKPI, auditType, handleDirectAuditStart, handleGoToMainDashboard, mockPocData, setMockPocData, communitiesList }) => {
    // ... existing AuditHistoryView logic ...
    const [resolvingPoc, setResolvingPoc] = useState(null);
    const [viewingNarrativePoc, setViewingNarrativePoc] = useState(null);
    const [historyFilter, setHistoryFilter] = useState('active'); // 'active' | 'resolved'
    const [localCommunityFilter, setLocalCommunityFilter] = useState('all'); // Added: Local toggle state

    const filteredPocs = useMemo(() => {
        let docs = mockPocData;
        
        if (activeCommunity) {
            docs = docs.filter(p => p.communityId === activeCommunity.id);
        } else if (localCommunityFilter !== 'all') {
            docs = docs.filter(p => p.communityId === localCommunityFilter);
        }
        
        if (auditType === 'POC_HIGH_RISK') {
            docs = docs.filter(p => p.risk === 'High Risk');
        }
        if (historyFilter === 'active') {
            docs = docs.filter(p => p.status !== 'Resolved');
        } else {
            docs = docs.filter(p => p.status === 'Resolved');
        }
        return docs;
    }, [mockPocData, activeCommunity, auditType, historyFilter, localCommunityFilter]);

    return (
        <div className="p-8 max-w-7xl mx-auto">
             {/* ... UI ... */}
             <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Audit & POC History</h1>
                    <p className="text-base text-gray-500">
                        {activeCommunity ? activeCommunity.name : 'All Communities'} 
                        {auditType === 'POC_HIGH_RISK' ? ' - High Risk Items' : ''}
                    </p>
                </div>
                <button onClick={handleGoToMainDashboard} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg transition-colors">Back to Dashboard</button>
            </div>
            {/* Filter Tabs */}
            <div className="flex space-x-6 mb-6 border-b border-gray-200">
                <button 
                    onClick={() => setHistoryFilter('active')}
                    className={`pb-3 px-2 font-bold text-base transition-colors relative ${
                        historyFilter === 'active' 
                            ? 'text-indigo-600 border-b-2 border-indigo-600' 
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Active Issues
                    <span className="ml-2 bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-sm">
                        {mockPocData.filter(p => (activeCommunity ? p.communityId === activeCommunity.id : true) && p.status !== 'Resolved' && (auditType === 'POC_HIGH_RISK' ? p.risk === 'High Risk' : true)).length}
                    </span>
                </button>
                <button 
                    onClick={() => setHistoryFilter('resolved')}
                    className={`pb-3 px-2 font-bold text-base transition-colors relative ${
                        historyFilter === 'resolved' 
                            ? 'text-indigo-600 border-b-2 border-indigo-600' 
                            : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    Resolved History
                </button>
            </div>
             <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                                {activeCommunity ? 'Community' : (
                                    <div className="flex items-center gap-1">
                                        <select 
                                            value={localCommunityFilter} 
                                            onChange={(e) => setLocalCommunityFilter(e.target.value)}
                                            className="bg-transparent border-none font-bold text-indigo-600 focus:ring-0 cursor-pointer outline-none uppercase text-sm p-0 m-0"
                                        >
                                            <option value="all">Toggle Community: All</option>
                                            {communitiesList.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                        </select>
                                    </div>
                                )}
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Finding / Citation</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                                {historyFilter === 'resolved' ? 'Resolved Date' : 'Due Date'}
                            </th>
                            <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredPocs.length === 0 ? (
                            <tr><td colSpan="5" className="px-6 py-12 text-center text-gray-500 italic">No {historyFilter} records found.</td></tr>
                        ) : (
                            filteredPocs.map(poc => (
                                <tr key={poc.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-base font-medium text-gray-900">
                                        {communitiesList.find(c => c.id === poc.communityId)?.name || 'Unknown'}
                                    </td>
                                    <td className="px-6 py-4 text-base text-gray-600">
                                        <div className="font-medium text-gray-900 mb-1">{poc.citation !== 'N/A' ? `Tag: ${poc.citation}` : ''}</div>
                                        {poc.finding}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-sm font-bold ${
                                            poc.status === 'Overdue' ? 'bg-red-100 text-red-800' : 
                                            poc.status === 'Resolved' ? 'bg-gray-100 text-gray-800' : 
                                            'bg-green-100 text-green-800'
                                        }`}>
                                            {poc.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-base text-gray-500">
                                        {historyFilter === 'resolved' ? (poc.resolvedDate ? formatDate(poc.resolvedDate) : 'N/A') : formatDate(poc.targetDate)}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {poc.status !== 'Resolved' ? (
                                            <button onClick={() => setResolvingPoc(poc)} className="text-indigo-600 hover:text-indigo-900 font-bold text-sm bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors">Resolve</button>
                                        ) : (
                                            <button onClick={() => setViewingNarrativePoc(poc)} className="text-gray-600 hover:text-gray-900 font-bold text-sm bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">View Notes</button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {resolvingPoc && <PocResolutionModal pocId={resolvingPoc.id} finding={resolvingPoc.finding} setMockPocData={setMockPocData} setShowModal={setResolvingPoc} />}
            {viewingNarrativePoc && <ResolutionNarrativeModal data={{ narrative: viewingNarrativePoc.resolutionNarrative || 'No resolution notes available.' }} onClose={() => setViewingNarrativePoc(null)} />}
        </div>
    );
};

const VisitTypeSelection = ({ community, setIsAuditMode, setAuditType, setActiveCommunityId, user, setIsVisitSelectMode }) => {
    return (
        <div className="p-8 max-w-xl mx-auto bg-white min-h-screen shadow-2xl">
            <div className="flex justify-between items-center mb-6 border-b pb-2">
                <h1 className="text-4xl font-extrabold text-indigo-700">Start Audit</h1>
                <button 
                    onClick={() => setIsVisitSelectMode(false)} 
                    className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-full hover:bg-red-50"
                >
                    <XCircle className="w-8 h-8" />
                </button>
            </div>
            
            <p className="text-xl text-gray-600 mb-8">Select an audit type for <span className="font-bold text-gray-900">{community.name}</span>:</p>
            <div className="grid grid-cols-1 gap-6">
                <button onClick={() => { setAuditType('WEEKLY_DASHBOARD'); setIsAuditMode(true); }} className="p-4 bg-indigo-50 border border-indigo-400 rounded-xl shadow-md hover:bg-indigo-100 text-left transition-all hover:shadow-lg transform hover:-translate-y-1"><div className="flex items-center text-indigo-800 font-bold mb-1"><Clock className="w-5 h-5 mr-2" /> Weekly Dashboard Review</div></button>
                <button onClick={() => { setAuditType('QUARTERLY_RN'); setIsAuditMode(true); }} className="p-4 bg-green-50 border border-green-400 rounded-xl shadow-md hover:bg-green-100 text-left transition-all hover:shadow-lg transform hover:-translate-y-1"><div className="flex items-center text-green-800 font-bold mb-1"><ClipboardListIcon className="w-5 h-5 mr-2" /> Quarterly RN/Ops Visit</div></button>
                <button onClick={() => { setAuditType('MOCK_SURVEY'); setIsAuditMode(true); }} className="p-4 bg-purple-50 border border-purple-400 rounded-xl shadow-md hover:bg-purple-100 text-left transition-all hover:shadow-lg transform hover:-translate-y-1"><div className="flex items-center text-purple-800 font-bold mb-1"><Shield className="w-5 h-5 mr-2" /> Mock Survey Inspection</div></button>
            </div>
            <button 
                onClick={() => setIsVisitSelectMode(false)} 
                className="mt-8 w-full py-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
                <ArrowBigLeftDash className="w-5 h-5 mr-2" />
                Back to Community Snapshot
            </button>
        </div>
    );
};

const SurveyEntranceDocs = ({ community, onClose, surveyDocsState, setSurveyDocsState }) => {
    // surveyDocsState structure: { [docId]: { file: 'name.pdf', date: '2025-12-14' } }
    const currentDocs = surveyDocsState[community.id] || {};

    const handleFileUpload = (docId, file) => {
        // Mock upload - in real app this would upload to server
        const newState = { 
            ...currentDocs, 
            [docId]: { 
                file: file.name, 
                date: new Date().toISOString().split('T')[0] 
            } 
        };
        setSurveyDocsState(prev => ({ ...prev, [community.id]: newState }));
    };

    return (
        <div className="p-8 max-w-4xl mx-auto bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-blue-800 flex items-center">
                        <FileText className="w-8 h-8 mr-3"/>
                        Survey Entrance Documents
                    </h1>
                    <p className="text-gray-600 text-lg mt-1">{community.name}</p>
                </div>
                <button 
                    onClick={onClose} 
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded-lg transition-colors"
                >
                    Close
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
                <div className="p-6 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-blue-900">Entrance Checklist</h2>
                        <p className="text-blue-700 text-sm">Please upload all required documents for the survey entrance conference.</p>
                    </div>
                    <div className="bg-white px-4 py-2 rounded-lg border border-blue-200 shadow-sm">
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Progress</span>
                        <div className="text-2xl font-bold text-blue-600">
                            {Object.keys(currentDocs).length} / {SURVEY_ENTRANCE_ITEMS.length}
                        </div>
                    </div>
                </div>
                
                <div className="divide-y divide-gray-100">
                    {SURVEY_ENTRANCE_ITEMS.map((item) => {
                        const doc = currentDocs[item.id];
                        const isUploaded = !!doc;
                        
                        return (
                            <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center mb-1">
                                        <h3 className="text-lg font-bold text-gray-800 mr-3">{item.name}</h3>
                                        {isUploaded ? (
                                            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded-full flex items-center">
                                                <CheckCircle className="w-3 h-3 mr-1" /> Uploaded
                                            </span>
                                        ) : (
                                            <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-0.5 rounded-full">
                                                Missing
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-gray-500 text-sm">{item.desc}</p>
                                    {isUploaded && (
                                        <p className="text-xs text-gray-400 mt-1 font-mono">
                                            {doc.file} • {formatDate(doc.date)}
                                        </p>
                                    )}
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <label className={`flex items-center justify-center px-4 py-2 rounded-lg cursor-pointer font-bold transition-all shadow-sm border ${
                                        isUploaded 
                                            ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50' 
                                            : 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:shadow-md'
                                    }`}>
                                        <Upload className="w-4 h-4 mr-2" />
                                        {isUploaded ? 'Replace' : 'Upload'}
                                        <input 
                                            type="file" 
                                            className="hidden" 
                                            onChange={(e) => {
                                                if (e.target.files && e.target.files[0]) {
                                                    handleFileUpload(item.id, e.target.files[0]);
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const UserManagement = ({ users, setUsers, roles, regions }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [formData, setFormData] = useState({ name: '', role: '', region: '', permissions: [] });
    const openModal = (user = null) => {
        if (user) {
            setEditingUser(user);
            setFormData({ name: user.name, role: user.role, region: user.region, permissions: user.permissions || [] });
        } else {
            setEditingUser(null);
            setFormData({ name: '', role: roles[0], region: regions[0], permissions: ['dashboard'] });
        }
        setIsModalOpen(true);
    };
    const handleSave = () => {
        if (!formData.name) return;
        if (editingUser) {
            setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData } : u));
        } else {
            setUsers([...users, { id: `user-${Date.now()}`, ...formData }]);
        }
        setIsModalOpen(false);
    };
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setUsers(users.filter(u => u.id !== id));
        }
    };
    const togglePermission = (moduleId) => {
        setFormData(prev => {
            if (prev.permissions.includes(moduleId)) {
                return { ...prev, permissions: prev.permissions.filter(p => p !== moduleId) };
            } else {
                return { ...prev, permissions: [...prev.permissions, moduleId] };
            }
        });
    };
    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                    <Users className="w-6 h-6 mr-2 text-indigo-600"/>
                    User Management
                </h3>
                <button onClick={() => openModal()} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center text-sm font-bold hover:bg-indigo-700">
                    <UserPlus className="w-4 h-4 mr-2"/>
                    Add New User
                </button>
            </div>
            
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Role</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Region</th>
                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase">Access</th>
                        <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{user.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.role}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.region}</td>
                            <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                {user.permissions ? user.permissions.length + ' Modules' : '0 Modules'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-base font-medium">
                                <button onClick={() => openModal(user)} className="text-indigo-600 hover:text-indigo-900 mr-4"><Edit className="w-4 h-4"/></button>
                                <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-4 h-4"/></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Add/Edit User Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-800">{editingUser ? 'Edit User' : 'Add New User'}</h3>
                            <button onClick={() => setIsModalOpen(false)}><XCircle className="text-gray-400 hover:text-gray-600"/></button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-1">Full Name</label>
                                <input 
                                    type="text" 
                                    value={formData.name} 
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="e.g. John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-base font-medium text-gray-700 mb-1">Role</label>
                                <select 
                                    value={formData.role} 
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                                >
                                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-base font-medium text-gray-700 mb-1">Region Assignment</label>
                                <select 
                                    value={formData.region} 
                                    onChange={(e) => setFormData({...formData, region: e.target.value})}
                                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                                >
                                    {regions.map(r => <option key={r} value={r}>{r}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="mb-6">
                            <label className="block text-base font-bold text-gray-800 mb-3 flex items-center">
                                <Lock className="w-4 h-4 mr-2"/>
                                Module Access Permissions
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {AVAILABLE_MODULES.map(mod => (
                                    <div 
                                        key={mod.id}
                                        onClick={() => togglePermission(mod.id)}
                                        className={`p-3 rounded-lg border cursor-pointer flex items-center transition-colors ${
                                            formData.permissions.includes(mod.id) 
                                                ? 'bg-indigo-50 border-indigo-500 text-indigo-700' 
                                                : 'bg-white border-gray-200 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className={`w-5 h-5 rounded border mr-3 flex items-center justify-center ${
                                            formData.permissions.includes(mod.id) ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'
                                        }`}>
                                            {formData.permissions.includes(mod.id) && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                        </div>
                                        <span className="text-base font-medium">{mod.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200">Cancel</button>
                            <button onClick={handleSave} className="px-5 py-2.5 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700">Save User</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const RegionalReportModal = ({ region, communities, pocMetrics, kpis, onClose }) => {
    const today = new Date().toLocaleDateString();
    
    // 1. Get communities in this region
    const regionCommunities = communities.filter(c => c.region === region);

    // 2. Identify Overdue/Problem Areas
    const itemsNeedingAttention = regionCommunities.map(c => {
        const cKpi = kpis[c.id] || {};
        const cMetrics = pocMetrics.communityPocCounts?.[c.id] || { overduePOCS: 0, highRisk: 0 };
        const overdueAudit = isDateOverdue(calculateNextDueDate(cKpi.weeklyDashboardLastCompletionDate || TODAY, 'Weekly'));
        
        let issues = [];
        if (cMetrics.overduePOCS > 0) issues.push(`${cMetrics.overduePOCS} Overdue POCs`);
        if (cMetrics.highRisk > 0) issues.push(`${cMetrics.highRisk} High Risk Items`);
        if (overdueAudit) issues.push("Weekly Audit Overdue");
        
        return {
            community: c.name,
            issues: issues
        };
    }).filter(item => item.issues.length > 0);

    // 3. Identify Compliant Areas
    const compliantAreas = regionCommunities.filter(c => {
        const cKpi = kpis[c.id] || {};
        const cMetrics = pocMetrics.communityPocCounts?.[c.id] || { overduePOCS: 0, highRisk: 0 };
        const overdueAudit = isDateOverdue(calculateNextDueDate(cKpi.weeklyDashboardLastCompletionDate || TODAY, 'Weekly'));
        
        return cMetrics.overduePOCS === 0 && cMetrics.highRisk === 0 && !overdueAudit;
    });

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 print:p-0 print:bg-white print:static print:z-[9999]">
             {/* Force print colors and layout */}
            <style>{`
                @media print {
                    body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    @page { margin: 15mm; size: portrait; }
                }
            `}</style>
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-8 print:shadow-none print:max-h-full print:rounded-none print:w-full print:h-auto print:overflow-visible">
                <div className="flex justify-between items-start mb-8 print:hidden">
                    <h2 className="text-3xl font-bold text-gray-800">Regional Report Preview</h2>
                    <div className="flex gap-4">
                        <button onClick={() => window.print()} className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700">
                            <Printer className="w-5 h-5 mr-2" /> Print / Download PDF
                        </button>
                        <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300">Close</button>
                    </div>
                </div>

                {/* Printable Report Content */}
                <div className="space-y-8">
                    <div className="border-b-2 border-gray-800 pb-4 mb-6">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{region} Region</h1>
                        <p className="text-xl text-gray-600">Compliance Summary Report • {today}</p>
                    </div>

                    {/* Items Needing Attention (Red) */}
                    <div>
                        <h3 className="text-2xl font-bold text-red-700 border-b border-red-200 mb-4 pb-2 flex items-center">
                            <AlertTriangle className="w-6 h-6 mr-2" /> Items Needing Attention
                        </h3>
                        {itemsNeedingAttention.length === 0 ? (
                            <p className="text-gray-500 italic p-4">No immediate concerns found in this region.</p>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {itemsNeedingAttention.map((item, idx) => (
                                    <div key={idx} className="p-4 bg-red-50 border border-red-200 rounded-lg break-inside-avoid">
                                        <h4 className="font-bold text-lg text-gray-900">{item.community}</h4>
                                        <ul className="list-disc pl-5 mt-2 space-y-1 text-red-700">
                                            {item.issues.map((issue, i) => (
                                                <li key={i}>{issue}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Areas of Compliance (Green) */}
                    <div>
                        <h3 className="text-2xl font-bold text-green-700 border-b border-green-200 mb-4 pb-2 flex items-center">
                            <CheckCircle className="w-6 h-6 mr-2" /> Areas of Compliance (Highlights)
                        </h3>
                        {compliantAreas.length === 0 ? (
                            <p className="text-gray-500 italic p-4">No fully compliant communities at this time.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {compliantAreas.map((c, idx) => (
                                    <div key={idx} className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center break-inside-avoid">
                                        <div className="bg-green-100 p-2 rounded-full mr-3">
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-gray-900">{c.name}</h4>
                                            <p className="text-sm text-green-700">All key metrics compliant.</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ReportsAndAnalysis = ({ communities, pocMetrics, kpis, onRegionClick, completedAudits }) => {
    const [selectedRegionReport, setSelectedRegionReport] = useState(null);

    // Aggregation Logic
    const regionalData = useMemo(() => {
        const regions = [...new Set(communities.map(c => c.region))];
        return regions.map(region => {
            const regionCommunities = communities.filter(c => c.region === region);
            
            // Calculate Composite Scores
            let totalComplianceScore = 0;
            
            const stats = regionCommunities.reduce((acc, c) => {
                // --- NEW SCORING LOGIC ---
                // Find latest audit results from completedAudits
                const latestWeekly = completedAudits
                    .filter(a => a.communityId === c.id && a.type === 'WEEKLY_DASHBOARD')
                    .sort((a,b) => b.date.localeCompare(a.date))[0];
                const latestQuarterly = completedAudits
                    .filter(a => a.communityId === c.id && a.type === 'QUARTERLY_RN')
                    .sort((a,b) => b.date.localeCompare(a.date))[0];

                const weeklyScore = latestWeekly ? latestWeekly.compliancePct : 0;
                const quarterlyScore = latestQuarterly ? latestQuarterly.compliancePct : 0;
                
                const kpi = kpis?.[c.id] || {};
                const isQuarterlyOverdue = isDateOverdue(calculateNextDueDate(kpi.quarterlyRNLastCompletionDate || TODAY, 'Quarterly'));
                const finalQuarterlyScore = isQuarterlyOverdue ? 0 : quarterlyScore;

                const communityCompliance = Math.round((weeklyScore * 0.4) + (finalQuarterlyScore * 0.6));
                // -------------------------

                totalComplianceScore += communityCompliance;
                acc.communitiesCount++;
                return acc;
            }, { region, communitiesCount: 0 });
            
            stats.complianceScore = Math.round(totalComplianceScore / (regionCommunities.length || 1));
            return stats;
        });
    }, [communities, pocMetrics, kpis, completedAudits]);
    return (
        <div className="space-y-8">
            {/* Horizontal Bar Graph - Regional Compliance */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <BarChart3 className="w-6 h-6 mr-2 text-indigo-600"/>
                    Regional Compliance Index (Real-Time)
                </h3>
                <div className="space-y-6">
                    {regionalData.map((data, index) => (
                        <div key={index} className="relative">
                            <div className="flex justify-between mb-1">
                                <span className="text-base font-bold text-gray-700">{data.region}</span>
                                <span className="text-base font-bold text-gray-700">{data.complianceScore}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div 
                                    className={`h-4 rounded-full transition-all duration-1000 ease-out ${
                                        data.complianceScore >= 90 ? 'bg-green-500' : 
                                        data.complianceScore >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                                    }`}
                                    style={{ width: `${data.complianceScore}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between mt-1 text-sm text-gray-500">
                                <span>Weekly / Quarterly Aggregate</span>
                                <span>{data.communitiesCount} Communities</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Company Wide Card */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center"><Building2 className="w-6 h-6 mr-2 text-indigo-600"/>Company Wide Performance</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 bg-indigo-50 rounded-lg">
                        <p className="text-base text-gray-500">Total Communities</p>
                        <p className="text-3xl font-bold text-indigo-700">{communities.length}</p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                        <p className="text-base text-gray-500">Total Open POCs</p>
                        <p className="text-3xl font-bold text-blue-700">{pocMetrics.totalOpenPOCS}</p>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg">
                        <p className="text-base text-gray-500">Total Overdue</p>
                        <p className="text-3xl font-bold text-red-700">{pocMetrics.totalOverduePOCS}</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                        <p className="text-base text-gray-500">High Risk Items</p>
                        <p className="text-3xl font-bold text-yellow-700">{pocMetrics.totalHighRisk}</p>
                    </div>
                </div>
            </div>
            {/* Regional Comparison Table */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-2xl font-bold text-gray-800 flex items-center"><TrendingUp className="w-6 h-6 mr-2 text-indigo-600"/>Detailed Regional Breakdown</h3>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Region</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Communities</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Open POCs</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Overdue</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">High Risk</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {regionalData.map((r, idx) => (
                            <tr 
                                key={idx} 
                                className="hover:bg-gray-50 cursor-pointer transition-colors"
                                onClick={() => setSelectedRegionReport(r.region)}
                            >
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{r.region}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{r.communitiesCount}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{r.openPOCS}</td>
                                <td className={`px-6 py-4 whitespace-nowrap font-bold ${r.overduePOCS > 0 ? 'text-red-600' : 'text-gray-500'}`}>{r.overduePOCS}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-yellow-600 font-bold">{r.highRisk}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 py-1 rounded-full text-sm font-semibold ${r.overduePOCS > 0 || r.highRisk > 2 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                        {r.overduePOCS > 0 || r.highRisk > 2 ? 'Needs Attention' : 'On Track'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Regional Report Modal */}
            {selectedRegionReport && (
                <RegionalReportModal 
                    region={selectedRegionReport}
                    communities={communities}
                    pocMetrics={pocMetrics}
                    kpis={kpis}
                    onClose={() => setSelectedRegionReport(null)}
                />
            )}
        </div>
    );
};

// Placeholder component to prevent ReferenceError
const ComplianceReportModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Report Details</h2>
            <p className="text-gray-600 mb-6">Detailed compliance report view is currently under development.</p>
            <button onClick={onClose} className="bg-gray-200 px-4 py-2 rounded-lg font-bold">Close</button>
        </div>
    </div>
);

const AdminPanel = ({ communities, setCommunities, setIsAdminMode, isAdminMode, kpis, setKpis, usersList, setUsersList, regionsList, setRegionsList, rolesList, setRolesList, pocMetrics, mockPocData, setMockPocData, activeCommunityId, activeCommunity, staffMembers, setStaffMembers, setDashboardRegionFilter, completedAudits, auditTemplates, setAuditTemplates }) => {
    const [activeTab, setActiveTab] = useState('communities'); 
    
    // Community Edit State
    const [editingCommunity, setEditingCommunity] = useState(null);
    const [communityFormData, setCommunityFormData] = useState({});

    const handleCommunityClick = (community) => {
        setEditingCommunity(community);
        setCommunityFormData({
            edName: community.edName || '',
            edPhone: community.edPhone || '',
            edEmail: community.edEmail || '',
            nurseName: community.nurseName || '',
            nursePhone: community.nursePhone || '',
            nurseEmail: community.nurseEmail || '',
            notificationTitle: community.notificationTitle || '',
            notificationPhone: community.notificationPhone || '',
            notificationEmail: community.notificationEmail || '',
            // Initialize with existing specialists or empty array
            infectionSpecialists: community.infectionSpecialists || []
        });
    };

    // Helper functions for Infection Control Specialist management
    const addSpecialist = () => {
        setCommunityFormData(prev => ({
            ...prev,
            infectionSpecialists: [...(prev.infectionSpecialists || []), { id: Date.now(), name: '', title: '', certificate: null }]
        }));
    };

    const removeSpecialist = (index) => {
        setCommunityFormData(prev => ({
            ...prev,
            infectionSpecialists: prev.infectionSpecialists.filter((_, i) => i !== index)
        }));
    };

    const updateSpecialist = (index, field, value) => {
        setCommunityFormData(prev => {
            const updated = [...(prev.infectionSpecialists || [])];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, infectionSpecialists: updated };
        });
    };

    const handleSaveCommunity = () => {
        setCommunities(prev => prev.map(c => c.id === editingCommunity.id ? { ...c, ...communityFormData } : c));
        setEditingCommunity(null);
    };

    const handleDeleteCommunity = () => {
        if (window.confirm(`Are you sure you want to delete ${editingCommunity.name}? This action cannot be undone.`)) {
            // Placeholder: In a real app, this would delete from backend/state
            alert(`Community ${editingCommunity.name} deleted (Placeholder)`);
            setEditingCommunity(null);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-6 flex items-center"><Settings className="w-7 h-7 mr-3 text-indigo-700"/> Administrative Panel</h1>
            <div className="flex border-b mb-6 overflow-x-auto">
                <button onClick={() => setActiveTab('communities')} className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'communities' ? 'border-b-4 border-indigo-600 text-indigo-700' : 'text-gray-500'}`}>Communities</button>
                <button onClick={() => setActiveTab('users')} className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'users' ? 'border-b-4 border-indigo-600 text-indigo-700' : 'text-gray-500'}`}>Users</button>
                <button onClick={() => setActiveTab('reports')} className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'reports' ? 'border-b-4 border-indigo-600 text-indigo-700' : 'text-gray-500'}`}>Reports</button>
                <button onClick={() => setActiveTab('templates')} className={`px-4 py-2 font-semibold whitespace-nowrap ${activeTab === 'templates' ? 'border-b-4 border-indigo-600 text-indigo-700' : 'text-gray-500'}`}>Audit Templates</button>
            </div>
            
            {activeTab === 'communities' && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">Communities List</h2>
                        <button 
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold flex items-center hover:bg-blue-700 transition-colors shadow-sm text-sm"
                            onClick={() => alert("Add Community functionality coming soon")}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Community
                        </button>
                    </div>
                    <ul className="space-y-3">
                        {communities.map(c => (
                            <li 
                                key={c.id} 
                                onClick={() => handleCommunityClick(c)}
                                className="p-4 bg-white shadow-sm rounded-xl border border-gray-100 cursor-pointer hover:bg-indigo-50 hover:border-indigo-200 hover:shadow-md transition-all duration-200 group"
                            >
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="font-bold text-lg text-gray-800 group-hover:text-indigo-700">{c.name}</div>
                                        <div className="text-sm text-gray-500">{c.region} • {c.license}</div>
                                    </div>
                                    <Edit className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transition-colors" />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {activeTab === 'users' && <UserManagement users={usersList} setUsers={setUsersList} roles={rolesList} regions={regionsList} />}
            
            {activeTab === 'reports' && (
                <ReportsAndAnalysis 
                    communities={communities} 
                    pocMetrics={pocMetrics} 
                    kpis={kpis} 
                    completedAudits={completedAudits}
                    onRegionClick={(region) => {
                        setDashboardRegionFilter(region);
                        setIsAdminMode(false);
                    }}
                />
            )}

            {activeTab === 'templates' && (
                <AuditTemplateManager 
                    auditTemplates={auditTemplates}
                    setAuditTemplates={setAuditTemplates}
                />
            )}

            <button onClick={() => setIsAdminMode(false)} className="mt-6 px-4 py-2 bg-gray-200 text-gray-700 font-bold rounded-xl">Back to Dashboard</button>

            {/* Community Edit Modal */}
            {editingCommunity && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-2xl animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b">
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900">{editingCommunity.name}</h3>
                                <p className="text-gray-500 text-sm">Edit Contact Information</p>
                            </div>
                            <button onClick={() => setEditingCommunity(null)}><XCircle className="text-gray-400 hover:text-gray-600 w-6 h-6"/></button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Executive Director Section */}
                            <div className="space-y-4">
                                <h4 className="font-bold text-indigo-700 flex items-center border-b pb-2"><User className="w-4 h-4 mr-2"/> Executive Director</h4>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        value={communityFormData.edName}
                                        onChange={(e) => setCommunityFormData({...communityFormData, edName: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Cell Phone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-2.5 top-2.5 text-gray-400 w-4 h-4" />
                                        <input 
                                            type="text" 
                                            className="w-full pl-9 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                            value={communityFormData.edPhone}
                                            onChange={(e) => setCommunityFormData({...communityFormData, edPhone: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-2.5 top-2.5 text-gray-400 w-4 h-4" />
                                        <input 
                                            type="text" 
                                            className="w-full pl-9 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                            value={communityFormData.edEmail}
                                            onChange={(e) => setCommunityFormData({...communityFormData, edEmail: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Nurse Section */}
                            <div className="space-y-4">
                                <h4 className="font-bold text-indigo-700 flex items-center border-b pb-2"><Ambulance className="w-4 h-4 mr-2"/> Clinical Director / Nurse</h4>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input 
                                        type="text" 
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                        value={communityFormData.nurseName}
                                        onChange={(e) => setCommunityFormData({...communityFormData, nurseName: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-2.5 top-2.5 text-gray-400 w-4 h-4" />
                                        <input 
                                            type="text" 
                                            className="w-full pl-9 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                            value={communityFormData.nursePhone}
                                            onChange={(e) => setCommunityFormData({...communityFormData, nursePhone: e.target.value})}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-2.5 top-2.5 text-gray-400 w-4 h-4" />
                                        <input 
                                            type="text" 
                                            className="w-full pl-9 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                            value={communityFormData.nurseEmail}
                                            onChange={(e) => setCommunityFormData({...communityFormData, nurseEmail: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Additional Notifications Section */}
                            <div className="md:col-span-2 space-y-4 pt-4 border-t border-gray-100">
                                <div className="flex justify-between items-center border-b pb-2">
                                    <h4 className="font-bold text-indigo-700 flex items-center"><Bell className="w-4 h-4 mr-2"/> Additional Notifications</h4>
                                    <button 
                                        className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center hover:bg-blue-200 transition-colors"
                                        onClick={() => alert("Edit Notification Schedule (Coming Soon)")}
                                    >
                                        <Calendar className="w-3 h-3 mr-1.5" />
                                        Edit Notification Schedule
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Title / Role</label>
                                        <input 
                                            type="text" 
                                            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                            placeholder="e.g. Regional Nurse"
                                            value={communityFormData.notificationTitle}
                                            onChange={(e) => setCommunityFormData({...communityFormData, notificationTitle: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                        <div className="relative">
                                            <Phone className="absolute left-2.5 top-2.5 text-gray-400 w-4 h-4" />
                                            <input 
                                                type="text" 
                                                className="w-full pl-9 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                                value={communityFormData.notificationPhone}
                                                onChange={(e) => setCommunityFormData({...communityFormData, notificationPhone: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-2.5 top-2.5 text-gray-400 w-4 h-4" />
                                            <input 
                                                type="text" 
                                                className="w-full pl-9 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                                value={communityFormData.notificationEmail}
                                                onChange={(e) => setCommunityFormData({...communityFormData, notificationEmail: e.target.value})}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Infection Control Specialist Section */}
                            <div className="md:col-span-2 space-y-4 pt-4 border-t border-gray-100">
                                <div className="flex justify-between items-center border-b pb-2">
                                    <h4 className="font-bold text-indigo-700 flex items-center"><Shield className="w-4 h-4 mr-2"/> Infection Control Specialist(s)</h4>
                                    <button 
                                        type="button"
                                        onClick={addSpecialist}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm font-bold flex items-center"
                                    >
                                        <Plus className="w-4 h-4 mr-1" /> Add Specialist
                                    </button>
                                </div>
                                
                                {(!communityFormData.infectionSpecialists || communityFormData.infectionSpecialists.length === 0) && (
                                    <div className="text-gray-500 italic text-sm p-2 bg-gray-50 rounded text-center">
                                        No Infection Control Specialists assigned. Click "Add Specialist" to add one.
                                    </div>
                                )}

                                {communityFormData.infectionSpecialists?.map((spec, index) => (
                                    <div key={spec.id || index} className="p-4 bg-gray-50 rounded-lg border border-gray-200 relative animate-in fade-in slide-in-from-top-2">
                                        <button 
                                            onClick={() => removeSpecialist(index)}
                                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                                            title="Remove Specialist"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                                <input 
                                                    type="text" 
                                                    value={spec.name}
                                                    onChange={(e) => updateSpecialist(index, 'name', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                                    placeholder="Specialist Name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                                <input 
                                                    type="text" 
                                                    value={spec.title}
                                                    onChange={(e) => updateSpecialist(index, 'title', e.target.value)}
                                                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                                                    placeholder="Job Title"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Certificate</label>
                                                <div className="flex items-center gap-2">
                                                    <label className="cursor-pointer bg-white border border-gray-300 text-gray-700 text-sm font-bold py-2 px-3 rounded-lg hover:bg-gray-50 flex items-center shadow-sm">
                                                        <Upload className="w-3 h-3 mr-2" />
                                                        {spec.certificate ? 'Replace' : 'Upload'}
                                                        <input 
                                                            type="file" 
                                                            className="hidden" 
                                                            onChange={(e) => {
                                                                if(e.target.files && e.target.files[0]) {
                                                                    updateSpecialist(index, 'certificate', e.target.files[0].name);
                                                                }
                                                            }}
                                                        />
                                                    </label>
                                                    {spec.certificate && (
                                                        <span className="text-xs text-green-600 font-medium truncate flex items-center bg-green-50 px-2 py-1 rounded border border-green-100">
                                                            <CheckCircle className="w-3 h-3 mr-1"/>
                                                            {spec.certificate}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-8 pt-4 border-t">
                            <button 
                                onClick={() => setEditingCommunity(null)} 
                                className="px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleDeleteCommunity} 
                                className="px-4 py-2 bg-red-100 text-red-600 font-bold rounded-lg hover:bg-red-200 transition-colors flex items-center border border-red-200"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete Community
                            </button>
                            <button 
                                onClick={handleSaveCommunity} 
                                className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- MAIN APPLICATION COMPONENT ---
const App = () => {
    const [communitiesList, setCommunitiesList] = useState(INITIAL_COMMUNITIES);
    const [communityKpis, setCommunityKpis] = useState(MOCK_COMMUNITY_KPI);
    const [mockPocData, setMockPocData] = useState(INITIAL_POC_DATA);
    const [staffMembers, setStaffMembers] = useState(INITIAL_STAFF.map(s => ({...s, trainings: []})));
    const [fireDrills, setFireDrills] = useState(INITIAL_FIRE_DRILLS);
    const [grievances, setGrievances] = useState(INITIAL_GRIEVANCES);
    const [chefChats, setChefChats] = useState(INITIAL_CHEF_CHATS);
    const [usersList, setUsersList] = useState(INITIAL_USERS);
    const [regionsList, setRegionsList] = useState(INITIAL_REGIONS);
    const [rolesList, setRolesList] = useState(INITIAL_ROLES);
    const [currentUserId, setCurrentUserId] = useState(MOCK_USER_CHRIS.id); 
    const user = useMemo(() => usersList.find(u => u.id === currentUserId) || MOCK_USER_JANE, [usersList, currentUserId]);
    const [activeCommunityId, setActiveCommunityId] = useState(null); 
    const activeCommunity = communitiesList.find(c => c.id === activeCommunityId);
    const [isAuditMode, setIsAuditMode] = useState(false);
    const [isVisitSelectMode, setIsVisitSelectMode] = useState(false);
    const [isSurveyDocsMode, setIsSurveyDocsMode] = useState(false); // New State for Docs Mode
    const [surveyDocsState, setSurveyDocsState] = useState({}); // New State for storing uploads
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [isHistoryMode, setIsHistoryMode] = useState(false);
    const [auditType, setAuditType] = useState(null);
    const [auditData, setAuditData] = useState({});
    const [mockSurveyResults, setMockSurveyResults] = useState(null);
    const [currentModule, setCurrentModule] = useState('dashboard'); // 'dashboard', 'staff_training', 'fire_drills', 'grievances'
    const [isChecklistReviewModalOpen, setIsChecklistReviewModalOpen] = useState(false); // New state for checklist modal
    const [isReportModalOpen, setIsReportModalOpen] = useState(false); // New state for reports modal
    const [activeRegionTab, setActiveRegionTab] = useState('All Regions'); // Moved state to App to control from Admin Panel

    // MODIFIED: State for Audit Templates with Persistence
    const [auditTemplates, setAuditTemplates] = useState(() => {
        try {
            const saved = localStorage.getItem('customAuditTemplates');
            if (saved) {
                // When parsing from JSON, icons (JSX) are lost.
                // We parse the structure but be aware icons will be missing in the object.
                // MobileAudit handles missing icons gracefully.
                return JSON.parse(saved);
            }
            return AUDIT_DATA_CONFIG;
        } catch (e) {
            console.error("Failed to load audit templates", e);
            return AUDIT_DATA_CONFIG;
        }
    });

    useEffect(() => {
        // We strip icons before saving to avoid React element warnings/errors in JSON
        // A deep clone/strip function would be ideal, but for now we rely on JSON.stringify ignoring functions/symbols
        // and React elements turning into plain objects which we reload.
        // NOTE: In a production app, icons should be string identifiers mapped to components.
        localStorage.setItem('customAuditTemplates', JSON.stringify(auditTemplates));
    }, [auditTemplates]);

    const [completedAudits, setCompletedAudits] = useState(() => {
        try {
            const saved = localStorage.getItem('completedAudits');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error("Failed to load completed audits", e);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem('completedAudits', JSON.stringify(completedAudits));
    }, [completedAudits]);
    // ----------------------------------------------------------------

    // Calculate Survey Dates for the active community
    const surveyDates = useMemo(() => {
        if (!activeCommunity) return { nextStateWindowStart: null, nextStateWindowEnd: null, mockSurveyRequiredWindow: { start: null, end: null } };
        return calculateMockSurveyRequirement(activeCommunity.lastSurveyDate);
    }, [activeCommunity]);
    const pocMetrics = useMemo(() => {
        const openPocs = mockPocData.filter(poc => poc.status === 'Open' || poc.status === 'Overdue');
        const overduePocs = openPocs.filter(poc => poc.status === 'Overdue');
        const highRiskPocs = openPocs.filter(poc => poc.risk === 'High Risk');
        const communityPocCounts = communitiesList.reduce((acc, comm) => {
            const commPocs = mockPocData.filter(poc => poc.communityId === comm.id && (poc.status === 'Open' || poc.status === 'Overdue'));
            acc[comm.id] = { openPOCS: commPocs.length, overduePOCS: commPocs.filter(poc => poc.status === 'Overdue').length, highRisk: commPocs.filter(poc => poc.risk === 'High Risk').length };
            return acc;
        }, {});
        const fireMetrics = communitiesList.reduce((acc, comm) => {
            const commDrills = fireDrills.filter(d => d.communityId === comm.id).sort((a,b) => b.date.localeCompare(a.date));
            acc[comm.id] = { 
                overdueDrills: commDrills.filter(d => isDateOverdue(d.date)).length, 
                lastDate: commDrills[0]?.date || null,
                fireCompliancePct: '100.0' 
            }; 
            return acc;
        }, {});
        const grievanceMetrics = communitiesList.reduce((acc, comm) => {
            const commGrievances = grievances.filter(g => g.communityId === comm.id).sort((a,b) => b.date.localeCompare(a.date));
            acc[comm.id] = {
                openCount: commGrievances.filter(g => g.status === 'Open').length,
                lastDate: commGrievances[0]?.date || null,
                overdueCount: commGrievances.filter(g => g.status === 'Open' && isDateOverdue(addDays(g.date, 5))).length
            };
            return acc;
        }, {});
        const chefChatMetrics = communitiesList.reduce((acc, comm) => {
            const commChats = chefChats.filter(c => c.communityId === comm.id).sort((a,b) => b.dateOfChat.localeCompare(a.dateOfChat));
            const lastDate = commChats[0]?.dateOfChat || null;
            acc[comm.id] = {
                lastDate,
                isOverdue: lastDate ? isDateOverdue(addDays(lastDate, 30)) : true,
            };
            return acc;
        }, {});
        const staffTrainingMetrics = communitiesList.reduce((acc, comm) => {
            const commStaff = staffMembers.filter(s => s.communityId === comm.id);
            const overdueCount = commStaff.reduce((total, staff) => {
                const reqs = generateRequiredTrainings(staff, communitiesList);
                return total + reqs.filter(t => isDateOverdue(t.dueDate) && !t.completed).length;
            }, 0);
            acc[comm.id] = { overdueCount };
            return acc;
        }, {});
        return { totalOpenPOCS: openPocs.length, totalOverduePOCS: overduePocs.length, totalHighRisk: highRiskPocs.length, communityPocCounts, mockPocData, fireMetrics, grievanceMetrics, chefChatMetrics, staffTrainingMetrics };
    }, [mockPocData, communitiesList, fireDrills, grievances, chefChats, staffMembers]);
    
    App.pocMetrics = pocMetrics;
    App.setStaffMembers = setStaffMembers;
    const baseKpis = communityKpis[activeCommunityId] || {};
    const dynamicPocKpis = pocMetrics.communityPocCounts[activeCommunityId] || { openPOCS: 0, overduePOCS: 0, highRisk: 0 };
    const dynamicFireKpis = pocMetrics.fireMetrics[activeCommunityId] || { overdueDrills: 0, lastDate: null, fireCompliancePct: '100.0' };
    const dynamicGrievanceKpis = pocMetrics.grievanceMetrics[activeCommunityId] || { openCount: 0, lastDate: null, overdueCount: 0 };
    const dynamicChefChatKpis = pocMetrics.chefChatMetrics[activeCommunityId] || { lastDate: null, isOverdue: true };
    const currentCommunityKPI = { ...baseKpis, ...dynamicPocKpis, fireMetrics: dynamicFireKpis, grievanceMetrics: dynamicGrievanceKpis, chefChatMetrics: dynamicChefChatKpis };
    
    const completeAudit = (type, communityId, auditResults) => {
        const today = new Date().toISOString().split('T')[0];
        
        // MODIFIED: Use state-based config
        const config = auditTemplates[type]; 
        
        // Calculate MET items (items without poc_needed = true)
        const metCount = Object.values(auditResults).filter(item => item && item.poc_needed === false).length;
        
        // Calculate Total Possible Items based on current template configuration
        const totalItemsInTemplate = config?.sections?.reduce((acc, sec) => acc + sec.items.length, 0) || 1;
        
        // Calculate percentage
        const compliancePct = Math.round((metCount / totalItemsInTemplate) * 100);

        setCompletedAudits(prev => [...prev, {
            id: Date.now(),
            communityId,
            type,
            date: today,
            compliancePct,
            metCount,
            totalCount: totalItemsInTemplate
        }]);
        // ---------------------------------------------------------

        setCommunityKpis(prevKpis => {
            const newKpis = { ...prevKpis };
            // Note: We no longer update 'compliancePct' here as it's calculated dynamically now
            if (type === 'WEEKLY_DASHBOARD') {
                newKpis[communityId] = { ...newKpis[communityId], weeklyDashboardLastCompletionDate: today, weeklyDue: calculateNextDueDate(today, 'Weekly') };
            } else if (type === 'QUARTERLY_RN') {
                newKpis[communityId] = { ...newKpis[communityId], quarterlyRNLastCompletionDate: today, quarterlyDue: calculateNextDueDate(today, 'Quarterly') };
            } else if (type === 'MONTHLY_FIRE_SAFETY') {
                newKpis[communityId] = { ...newKpis[communityId], fireDrillLastDate: today };
            }
            return newKpis;
        });
    };

    const handleChecklistConfirm = () => {
        if (!activeCommunityId) return;
        setCommunityKpis(prev => ({
            ...prev,
            [activeCommunityId]: {
                ...prev[activeCommunityId],
                surveyChecklistLastReviewDate: TODAY
            }
        }));
        setIsChecklistReviewModalOpen(false);
    };

    const handleDirectAuditStart = (mode, type = null) => {
        if (!activeCommunityId && mode !== 'HISTORY') return;
        if (mode === 'HISTORY') {
            setAuditType(type); setIsHistoryMode(true); setIsAuditMode(false); setIsVisitSelectMode(false);
        } else {
            setAuditType(mode); setAuditData({}); setIsVisitSelectMode(false); setIsHistoryMode(false); setIsAuditMode(true);
        }
    }
    const Header = () => {
        const [isMenuOpen, setIsMenuOpen] = useState(false);
        return (
            <header className="bg-white shadow-md p-4 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="relative">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center space-x-2 text-3xl font-extrabold text-indigo-700 hover:text-indigo-800 transition-colors focus:outline-none"
                        >
                            <Building2 className="w-6 h-6" />
                            <span><span className="text-black">CareScope</span><span className="text-blue-500">360</span></span>
                            <ChevronDown className={`w-5 h-5 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isMenuOpen && (
                            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                                <div className="px-4 py-2 border-b border-gray-100 text-sm font-semibold text-gray-400 uppercase">Modules</div>
                                <button onClick={() => { setActiveCommunityId(null); setIsAdminMode(false); setCurrentModule('dashboard'); setIsMenuOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center text-gray-700 font-medium transition-colors text-base">
                                    <LayoutDashboard className="w-4 h-4 mr-3 text-indigo-500" />
                                    Clinical Dashboard
                                </button>
                                <button onClick={() => { setCurrentModule('fire_drills'); setIsMenuOpen(false); setActiveCommunityId(null); setIsAdminMode(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center text-gray-700 font-medium transition-colors text-base">
                                    <Flame className="w-4 h-4 mr-3 text-orange-500" />
                                    Fire Drills
                                </button>
                                <button onClick={() => { setCurrentModule('grievances'); setIsMenuOpen(false); setActiveCommunityId(null); setIsAdminMode(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center text-gray-700 font-medium transition-colors text-base">
                                    <MessageSquare className="w-4 h-4 mr-3 text-blue-500" />
                                    Grievances
                                </button>
                                <button onClick={() => { setCurrentModule('staff_training'); setIsMenuOpen(false); setActiveCommunityId(null); setIsAdminMode(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center text-gray-700 font-medium transition-colors text-base">
                                    <GraduationCap className="w-4 h-4 mr-3 text-green-500" />
                                    Staff Training
                                </button>
                                <button onClick={() => { setCurrentModule('survey_compliance'); setIsMenuOpen(false); setActiveCommunityId(null); setIsAdminMode(false); }} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center text-gray-700 font-medium transition-colors text-base">
                                    <Compass className="w-4 h-4 mr-3 text-red-500" />
                                    Survey Entrance/Compliance Items
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-4">
                        {user.role === 'Corporate QA' && <button onClick={() => setIsAdminMode(true)} className="px-3 py-1.5 bg-gray-100 rounded-lg text-base font-semibold flex items-center hover:bg-gray-200 transition-colors"><Settings className="w-4 h-4 mr-1.5" />Admin</button>}
                        
                        {/* User Switcher for Demo/Testing Purposes */}
                        <div className="relative">
                            <select 
                                value={currentUserId} 
                                onChange={(e) => setCurrentUserId(e.target.value)} 
                                className="bg-indigo-50 border border-indigo-200 text-indigo-800 text-base font-bold rounded-lg p-2.5 mr-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                            >
                                {usersList.map(u => (
                                    <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </header>
        );
    };
    if (isAuditMode && activeCommunity) return <div className="bg-gray-100 min-h-screen"><MobileAudit community={activeCommunity} user={user} auditType={auditType} auditData={auditData} setAuditData={setAuditData} setIsAuditMode={setIsAuditMode} completeAudit={completeAudit} auditTemplates={auditTemplates} /></div>;
    if (isAdminMode) return <div className="bg-gray-50 min-h-screen"><Header /><AdminPanel 
        communities={communitiesList} 
        setCommunities={setCommunitiesList} 
        setIsAdminMode={setIsAdminMode} 
        isAdminMode={isAdminMode} // Ensure this is passed
        kpis={communityKpis} 
        setKpis={setCommunityKpis} 
        usersList={usersList} 
        setUsersList={setUsersList} 
        regionsList={regionsList} 
        setRegionsList={setRegionsList} 
        rolesList={rolesList} 
        setRolesList={setRolesList} 
        pocMetrics={pocMetrics} 
        mockPocData={mockPocData} 
        setMockPocData={setMockPocData} 
        activeCommunityId={activeCommunityId} 
        activeCommunity={activeCommunity} 
        staffMembers={staffMembers} 
        setStaffMembers={setStaffMembers} 
        setDashboardRegionFilter={setActiveRegionTab}
        completedAudits={completedAudits} 
        auditTemplates={auditTemplates}      // NEW
        setAuditTemplates={setAuditTemplates} // NEW
    /></div>;
    if (isHistoryMode) return <div className="bg-gray-100 min-h-screen"><AuditHistoryView activeCommunity={activeCommunity} currentCommunityKPI={currentCommunityKPI} auditType={auditType} handleDirectAuditStart={handleDirectAuditStart} handleGoToMainDashboard={() => { setIsHistoryMode(false); }} mockPocData={mockPocData} setMockPocData={setMockPocData} communitiesList={communitiesList} /></div>;
    if (isVisitSelectMode && activeCommunity) return <div className="bg-gray-100 min-h-screen"><VisitTypeSelection community={activeCommunity} setIsAuditMode={setIsAuditMode} setAuditType={setAuditType} user={user} setActiveCommunityId={setActiveCommunityId} setIsVisitSelectMode={setIsVisitSelectMode} /></div>;
    if (isSurveyDocsMode && activeCommunity) return <div className="bg-gray-100 min-h-screen"><SurveyEntranceDocs community={activeCommunity} onClose={() => setIsSurveyDocsMode(false)} surveyDocsState={surveyDocsState} setSurveyDocsState={setSurveyDocsState} /></div>;
    
    // Module Routing Logic
    if (!activeCommunityId) {
        if (currentModule === 'staff_training') {
            return (
                <div className="bg-gray-50 min-h-screen">
                    <Header />
                    {/* Placeholder for StaffTrainingModule as it's not defined in context, assuming it exists or replacing with simple text */}
                    <div className="p-8">
                        <h1 className="text-3xl font-bold">Staff Training Module</h1>
                        <p className="text-gray-600">Module content loading...</p>
                    </div>
                </div>
            );
        }
        // Placeholder for other modules
        if (currentModule === 'fire_drills') {
             return <div className="bg-gray-50 min-h-screen"><Header /><div className="p-8"><h1 className="text-3xl font-bold">Fire Drill Module (Coming Soon)</h1></div></div>;
        }
        if (currentModule === 'grievances') {
             return <div className="bg-gray-50 min-h-screen"><Header /><div className="p-8"><h1 className="text-3xl font-bold">Grievances Module (Coming Soon)</h1></div></div>;
        }
        if (currentModule === 'chef_chats') {
             return <div className="bg-gray-50 min-h-screen"><Header /><div className="p-8"><h1 className="text-3xl font-bold">Chef Chat Pending Menu</h1></div></div>;
        }
        if (currentModule === 'survey_compliance') {
             return <div className="bg-gray-50 min-h-screen"><Header /><div className="p-8"><h1 className="text-3xl font-bold text-slate-900">Survey Entrance/Compliance Items (Coming Soon)</h1></div></div>;
        }
        // Default Dashboard
        return <div className="bg-gray-50 min-h-screen"><Header /><MultiCommunityDashboard 
            activeRegionTab={activeRegionTab} 
            setActiveRegionTab={setActiveRegionTab} 
            setActiveCommunityId={setActiveCommunityId} 
            user={user} 
            communities={communitiesList} 
            handleDirectAuditStart={handleDirectAuditStart} 
            totalOpenPOCS={pocMetrics.totalOpenPOCS} 
            totalOverduePOCS={pocMetrics.totalOverduePOCS} 
            totalHighRisk={pocMetrics.totalHighRisk} 
            kpis={communityKpis} 
            completedAudits={completedAudits} // Passed new prop
        /></div>;
    }
    
    // Calculate checklist status for the active community view
    const checklistNextDue = currentCommunityKPI.surveyChecklistLastReviewDate ? addMonths(currentCommunityKPI.surveyChecklistLastReviewDate, 1) : null;
    const isChecklistOverdue = isDateOverdue(checklistNextDue);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Header />
            <div className="p-4 sm:p-8 max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6 border-b pb-2">
                    <h1 className="text-4xl font-extrabold text-gray-800">{activeCommunity.name} Compliance Snapshot</h1>
                    <button onClick={() => setActiveCommunityId(null)} className="text-base font-semibold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg flex items-center"><ArrowBigLeftDash className="w-4 h-4 mr-1.5" />Main Dashboard</button>
                </div>
                <div className="flex flex-wrap gap-4 mb-10">
                    <button onClick={() => handleDirectAuditStart('HISTORY', 'POC_OPEN')} className="px-5 py-3 bg-red-500 text-white font-bold rounded-xl shadow-md flex items-center"><AlertTriangle className="w-5 h-5 mr-2" />Overdue POCs ({currentCommunityKPI.overduePOCS})</button>
                    <button onClick={() => setIsVisitSelectMode(true)} className="px-5 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md flex items-center"><CalendarCheck className="w-5 h-5 mr-2" />Start New Audit</button>
                    <button onClick={() => setIsSurveyDocsMode(true)} className="px-5 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md flex items-center hover:bg-blue-700 transition-colors"><FileText className="w-5 h-5 mr-2" />Survey Entrance Documents</button>
                </div>
                <h2 className="text-3xl font-bold text-indigo-700 mb-4 pt-4 border-t">Survey Readiness & Windows</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                     <RenderSurveyCard 
                        title="State Survey Window" 
                        start={surveyDates.nextStateWindowStart} 
                        end={surveyDates.nextStateWindowEnd} 
                     />
                     <RenderSurveyCard 
                        title="Click to begin Mock Survey" 
                        start={surveyDates.mockSurveyRequiredWindow.start} 
                        end={surveyDates.mockSurveyRequiredWindow.end} 
                        isMock={true}
                        onClick={() => handleDirectAuditStart('MOCK_SURVEY')}
                     />
                </div>
                <h2 className="text-4xl font-bold text-indigo-700 mb-4 pt-4 border-t">Staff Training & Compliance</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {/* Fire Drill Card */}
                    <div 
                        onClick={() => {
                            setActiveCommunityId(null);
                            setCurrentModule('fire_drills');
                        }}
                        className="bg-white p-8 rounded-xl shadow-md border border-gray-200 flex items-center gap-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <div className="bg-orange-500 p-4 rounded-xl text-white shadow-lg"><Flame size={32}/></div>
                        <div>
                            <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Last Fire Drill</p>
                            <p className="text-3xl font-black text-gray-900">{formatDate(currentCommunityKPI.fireMetrics.lastDate)}</p>
                            {currentCommunityKPI.fireMetrics.overdueDrills > 0 ? 
                                <p className="text-sm font-bold text-red-600 uppercase">OVERDUE</p> : 
                                <p className="text-sm font-bold text-green-600 uppercase">Compliant</p>}
                        </div>
                    </div>
                    {/* Grievance Card */}
                    <div 
                        onClick={() => {
                            setActiveCommunityId(null);
                            setCurrentModule('grievances');
                        }}
                        className="bg-white p-8 rounded-xl shadow-md border border-gray-200 flex items-center gap-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <div className="bg-blue-500 p-4 rounded-xl text-white shadow-lg"><MessageSquare size={32}/></div>
                        <div>
                            <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Active Grievances</p>
                            <p className="text-3xl font-black text-gray-900">{currentCommunityKPI.grievanceMetrics.openCount}</p>
                            {currentCommunityKPI.grievanceMetrics.overdueCount > 0 ? 
                                <p className="text-sm font-bold text-red-600 uppercase">{currentCommunityKPI.grievanceMetrics.overdueCount} Overdue Action</p> : 
                                <p className="text-sm font-bold text-green-600 uppercase">All Current</p>}
                        </div>
                    </div>
                    {/* Chef Chat Card */}
                    <div 
                        onClick={() => {
                            setActiveCommunityId(null);
                            setCurrentModule('chef_chats');
                        }}
                        className="bg-white p-8 rounded-xl shadow-md border border-gray-200 flex items-center gap-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <div className="bg-emerald-600 p-4 rounded-xl text-white shadow-lg"><ChefHat size={32}/></div>
                        <div>
                            <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Last Chef Chat</p>
                            <p className="text-3xl font-black text-gray-900">{formatDate(currentCommunityKPI.chefChatMetrics.lastDate)}</p>
                            {currentCommunityKPI.chefChatMetrics.isOverdue ? 
                                <p className="text-sm font-bold text-red-600 uppercase">OVERDUE</p> : 
                                <p className="text-sm font-bold text-green-600 uppercase">Compliant</p>}
                        </div>
                    </div>

                    {/* New Survey Entrance Checklist Card */}
                    <div 
                        onClick={() => setIsChecklistReviewModalOpen(true)}
                        className="bg-white p-8 rounded-xl shadow-md border border-gray-200 flex items-center gap-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                        <div className="bg-indigo-600 p-4 rounded-xl text-white shadow-lg"><ClipboardCheck size={32}/></div>
                        <div>
                            <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Survey Checklist</p>
                            <p className="text-xl font-black text-gray-900 mt-1 mb-1">Monthly Review</p>
                            {isChecklistOverdue ? 
                                <p className="text-sm font-bold text-red-600 uppercase">Review Needed</p> : 
                                <p className="text-sm font-bold text-green-600 uppercase">Current</p>}
                        </div>
                    </div>
                </div>
                
                {/* Checklist Review Modal */}
                {isChecklistReviewModalOpen && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                        <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full animate-in zoom-in-95">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Confirm Checklist Review</h3>
                            <p className="text-gray-600 mb-6">By confirming, you acknowledge that you have reviewed the Survey Entrance Checklist for this month and all items are present or being addressed.</p>
                            <div className="flex gap-4">
                                <button onClick={() => setIsChecklistReviewModalOpen(false)} className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200">Cancel</button>
                                <button onClick={handleChecklistConfirm} className="flex-1 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700">Confirm Review</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
