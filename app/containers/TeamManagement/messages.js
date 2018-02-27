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
  upgradeToAdminHeader: {
    id: 'app.components.TeamManagement.upgradeToAdminHeader',
    defaultMessage: 'UPGRADE MEMBER',
  },
  upgradeToAdminPrompt: {
    id: 'app.components.TeamManagement.upgradeToAdminPrompt',
    defaultMessage: 'Are you sure you want to upgrade {name} to Admin?',
  },
  upgradeToAdminAction: {
    id: 'app.components.TeamManagement.upgradeToAdminAction',
    defaultMessage: 'YES, UPGRADE MEMBER',
  },
  deleteAccountHeader: {
    id: 'app.components.TeamManagement.deleteAccountHeader',
    defaultMessage: 'REMOVE MEMBER',
  },
  deleteAccountPrompt: {
    id: 'app.components.TeamManagement.deleteAccountPrompt',
    defaultMessage:
      "Are you sure you want to remove {name}'s account permanently?",
  },
  deleteAccountAction: {
    id: 'app.components.TeamManagement.deleteAccountAction',
    defaultMessage: 'YES, REMOVE MEMBER',
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
