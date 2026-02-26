# CRM Detail Module

A modular architecture for the vehicle tracking detail page.

## 📁 Structure

```
crm/
├── components/          # React components
│   ├── VehicleHeader.tsx
│   ├── PhasePipeline.tsx
│   ├── ProcessOverview.tsx
│   ├── MandatoryAttachments.tsx
│   ├── TimelinePhases.tsx
│   └── StepUpdateModal.tsx
├── hooks/              # Custom React hooks
│   ├── useVehicleDetailData.ts
│   └── useStepUpdate.ts
├── types.ts            # TypeScript type definitions
├── constants.ts        # Static constants
├── utils.ts            # Utility functions
├── index.ts            # Module exports
└── README.md           # This file
```

## 🧩 Components

### VehicleHeader
Displays vehicle information, title, route, and status buttons.

**Props:**
- `vehicleData: ApiVehicleData` - Vehicle data from API

### PhasePipeline
Horizontal phase pipeline status display.

**Props:**
- `phases: Phase[]` - Array of phase configurations

### ProcessOverview
Left sidebar showing process statistics and vehicle info.

**Props:**
- `vehicleData: ApiVehicleData` - Vehicle data
- `totalSteps: number` - Total number of steps
- `completedSteps: number` - Number of completed steps

### MandatoryAttachments
Left sidebar showing required document attachments.

**Props:**
- `attachments: MandatoryAttachment[]` - List of mandatory attachments

### TimelinePhases
Main timeline section with collapsible phases and steps.

**Props:**
- `phaseGroups: PhaseGroup[]` - Timeline phases with steps
- `expandedPhases: Set<string>` - Set of expanded phase IDs
- `onTogglePhase: (phaseId: string) => void` - Phase toggle handler
- `onStepClick: (step: TimelineStep) => void` - Step click handler

### StepUpdateModal
Modal for updating step status, notes, and documents.

**Props:**
- `isOpen: boolean` - Modal visibility
- `selectedStep: TimelineStep | null` - Selected step
- `selectedStatus: StepStatus | null` - Selected status
- `notes: string` - Notes text
- `selectedFile: File | null` - Selected file
- `isSaving: boolean` - Saving state
- `onClose: () => void` - Close handler
- `onStatusChange: (status: StepStatus) => void` - Status change handler
- `onNotesChange: (notes: string) => void` - Notes change handler
- `onFileChange: (e: ChangeEvent) => void` - File change handler
- `onFileDrop: (e: DragEvent) => void` - File drop handler
- `onFileDragOver: (e: DragEvent) => void` - File drag over handler
- `onSave: () => void` - Save handler

## 🪝 Hooks

### useVehicleDetailData
Manages vehicle data fetching and state.

**Parameters:**
- `vehicleId?: string` - Vehicle ID to fetch

**Returns:**
- `vehicleData: ApiVehicleData | null` - Vehicle data
- `isLoading: boolean` - Loading state
- `error: string | null` - Error message
- `refetchVehicle: () => Promise<void>` - Refetch function

### useStepUpdate
Manages step update modal state and logic.

**Returns:**
- `isModalOpen: boolean` - Modal visibility
- `selectedStep: TimelineStep | null` - Selected step
- `selectedStatus: StepStatus | null` - Selected status
- `notes: string` - Notes text
- `selectedFile: File | null` - Selected file
- `isSaving: boolean` - Saving state
- `openStepModal: (step: TimelineStep) => void` - Open modal
- `closeStepModal: () => void` - Close modal
- `setSelectedStatus: (status: StepStatus) => void` - Set status
- `setNotes: (notes: string) => void` - Set notes
- `setSelectedFile: (file: File) => void` - Set file
- `handleSaveStep: (vehicleId: string, onSuccess: () => void) => Promise<void>` - Save step

## 🛠️ Utilities

### getCustomerTypeDisplay
Converts customer type enum to display string.

### getRouteDisplay
Generates route display string from vehicle data.

### transformToPhaseGroups
Transforms API vehicle data to UI phase groups.

### calculateStepProgress
Calculates total and completed steps from phase groups.

## 📊 Data Flow

```
Vehicle ID
    ↓
useVehicleDetailData Hook
    ↓
API Request
    ↓
Transform Data (utils)
    ↓
Pass to Components
    ↓
Render UI
    ↓
User Interaction
    ↓
useStepUpdate Hook
    ↓
API Update
    ↓
Refetch Data
    ↓
UI Updates
```

## 🎨 Benefits

1. **Separation of Concerns** - Each component has a single responsibility
2. **Reusability** - Components can be reused in different contexts
3. **Testability** - Isolated components are easier to test
4. **Maintainability** - Changes are localized to specific modules
5. **Type Safety** - Centralized types ensure consistency
6. **Performance** - Smaller components optimize re-renders

## 🔄 Usage Example

```tsx
import CRMDetailPage from "./CRMDetailPage";

// In your page component
<CRMDetailPage vehicleId="75" />
```

## 📝 Adding New Features

1. **New Component**: Add to `components/` folder
2. **New Hook**: Add to `hooks/` folder
3. **New Type**: Add to `types.ts`
4. **New Constant**: Add to `constants.ts`
5. **New Utility**: Add to `utils.ts`
6. **Export**: Add to `index.ts`

