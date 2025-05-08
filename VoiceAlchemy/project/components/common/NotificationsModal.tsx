import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/useTheme';
import { X, Calendar, Clock, Medal, Bell } from 'lucide-react-native';

interface NotificationsModalProps {
  visible: boolean;
  onClose: () => void;
}

// Sample notifications data
const NOTIFICATIONS = [
  {
    id: '1',
    title: 'Daily practice reminder',
    message: 'Time for your daily voice exercise! Maintain your streak.',
    time: '5 minutes ago',
    read: false,
    icon: Calendar,
    iconColor: '#3B82F6',
  },
  {
    id: '2',
    title: 'Voice progress update',
    message: 'Your clarity score improved by 8% this week. Great job!',
    time: '2 hours ago',
    read: false,
    icon: Medal,
    iconColor: '#F59E0B',
  },
  {
    id: '3',
    title: 'Upcoming meeting prep',
    message: 'Client meeting in 30 minutes. Review your voice arsenal.',
    time: 'Yesterday',
    read: true,
    icon: Clock,
    iconColor: '#EC4899',
  },
  {
    id: '4',
    title: 'Weekly voice report',
    message: 'Your weekly progress report is ready to view.',
    time: '2 days ago',
    read: true,
    icon: Bell,
    iconColor: '#10B981',
  },
];

export default function NotificationsModal({
  visible,
  onClose,
}: NotificationsModalProps) {
  const { colors } = useTheme();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { backgroundColor: colors.card }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Notifications</Text>
            <Pressable 
              style={[styles.closeButton, { backgroundColor: colors.backgroundSecondary }]}
              onPress={onClose}
            >
              <X size={20} color={colors.text} />
            </Pressable>
          </View>

          <ScrollView style={styles.notificationsContainer}>
            {NOTIFICATIONS.map(notification => {
              const NotificationIcon = notification.icon;
              
              return (
                <Pressable 
                  key={notification.id}
                  style={[
                    styles.notificationItem, 
                    { 
                      backgroundColor: notification.read ? colors.card : colors.backgroundSecondary,
                      borderLeftColor: notification.read ? 'transparent' : notification.iconColor,
                    }
                  ]}
                >
                  <View 
                    style={[
                      styles.notificationIconContainer, 
                      { backgroundColor: `${notification.iconColor}20` }
                    ]}
                  >
                    <NotificationIcon size={18} color={notification.iconColor} />
                  </View>
                  
                  <View style={styles.notificationContent}>
                    <Text style={[styles.notificationTitle, { color: colors.text }]}>
                      {notification.title}
                    </Text>
                    <Text style={[styles.notificationMessage, { color: colors.textSecondary }]}>
                      {notification.message}
                    </Text>
                    <Text style={[styles.notificationTime, { color: colors.textTertiary }]}>
                      {notification.time}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
          
          <View style={styles.actionsContainer}>
            <Pressable 
              style={[styles.actionButton, { backgroundColor: colors.backgroundSecondary }]}
              onPress={onClose}
            >
              <Text style={[styles.actionButtonText, { color: colors.text }]}>Mark all as read</Text>
            </Pressable>
            
            <Pressable 
              style={[styles.actionButton, { backgroundColor: colors.primary }]}
              onPress={onClose}
            >
              <Text style={styles.doneButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationsContainer: {
    maxHeight: 500,
  },
  notificationItem: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderLeftWidth: 3,
  },
  notificationIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    marginBottom: 6,
    lineHeight: 20,
  },
  notificationTime: {
    fontSize: 12,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  actionButtonText: {
    fontWeight: '500',
    fontSize: 15,
  },
  doneButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
});