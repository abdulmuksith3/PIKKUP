import { APPLY_LEAVE_SCREEN, ATTENDANCE_SCREEN, LEAVE_RETURN_SCREEN, MY_LEAVE_SCREEN, SWIPE_SCREEN } from "./Navigations";

export const DRAWER_SECTIONS = [
    { //SECTION 1
      sectionTitle: "ATTENDANCE",
      items: [
        {
          name: "Attendance",
          iconName: "clock",
          iconType: "feather",
          iconSize: 18,
          navigationName: ATTENDANCE_SCREEN
        },
        {
          name: "Swipe Request",
          iconName: "skip-back",
          iconType: "feather",
          iconSize: 18,
          navigationName: SWIPE_SCREEN
        },
        
      ]
    },
    { //SECTION 2
      sectionTitle: "LEAVE",
      items: [
        
        {
          name: "My Leave",
          iconName: "document-text-outline",
          iconType: "ionicon",
          iconSize: 18,
          navigationName: MY_LEAVE_SCREEN
        },
        {
          name: "Apply Leave",
          iconName: "pencil-square-o",
          iconType: "font-awesome",
          iconSize: 18,
          navigationName: APPLY_LEAVE_SCREEN
        },
        {
          name: "Leave Return",
          iconName: "back",
          iconType: "ant-design",
          iconSize: 18,
          navigationName: LEAVE_RETURN_SCREEN
        },
        
      ]
    }
  ]