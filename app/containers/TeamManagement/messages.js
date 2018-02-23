/*
 * TeamManagement Messages
 *
 * This contains all the text for the TeamManagement component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  admin: {
    id: 'app.components.TeamManagement.admin',
    defaultMessage: 'ADMIN',
  },
  invite: {
    id: 'app.components.TeamManagement.invite',
    defaultMessage: 'INVITE',
  },
  member: {
    id: 'app.components.TeamManagement.member',
    defaultMessage: 'MEMBER',
  },
  superUser: {
    id: 'app.components.TeamManagement.superUser',
    defaultMessage: 'Super User',
  },
  upgradeToAdmin: {
    id: 'app.components.TeamManagement.upgradeToAdmin',
    defaultMessage: 'UPGRADE TO ADMIN',
  },
  removeMember: {
    id: 'app.components.TeamManagement.removeMember',
    defaultMessage: 'REMOVE MEMBER',
  },
  upgradeToAdminPrompt: {
    id: 'app.components.TeamManagement.upgradeToAdminPrompt',
    defaultMessage: 'Upgrade {name} to Admin?',
  },
  upgradeToAdminConfirm: {
    id: 'app.components.TeamManagement.upgradeToAdminConfirm',
    defaultMessage: 'Confirm',
  },
  deleteAccountPrompt: {
    id: 'app.components.TeamManagement.deleteAccountPrompt',
    defaultMessage: "Delete {name}'s account permanently?",
  },
  deleteAccountConfirm: {
    id: 'app.components.TeamManagement.deleteAccountConfirm',
    defaultMessage: 'Confirm',
  },
  addMember: {
    id: 'app.components.TeamManagement.addMember',
    defaultMessage: 'Add Member',
  },
  teamManagement: {
    id: 'app.components.TeamManagement.teamManagement',
    defaultMessage: 'Team Management',
  },
});
