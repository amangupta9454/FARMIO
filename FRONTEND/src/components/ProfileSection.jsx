import React, { useState, useEffect } from 'react';
import { getUserProfile } from '../utils/api';
import { useTranslation } from 'react-i18next';
import '../utils/i18n';

const ProfileSection = ({ user }) => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const { data } = await getUserProfile(localStorage.getItem('token'));
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(t('profile.error'));
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user, t]);

  if (!user) return (
    <div className="flex items-center justify-center min-h-[200px] text-white text-lg sm:text-xl animate-pulse">
      {t('profile.pleaseLogin')}
    </div>
  );
  if (loading) return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-400"></div>
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center min-h-[200px] text-red-400 text-lg sm:text-xl animate-pulse">
      {error}
    </div>
  );

  return (
    <div className="backdrop-blur-2xl bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-2xl p-4 sm:p-5 lg:p-6 shadow-2xl border border-green-300/30 transform transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] animate-slideUp max-w-md mx-auto">
      <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-300 via-blue-300 to-yellow-300 text-transparent bg-clip-text mb-4 sm:mb-6 text-center animate-gradient">
        {t('profile.title')}
      </h3>
      {profile?.profileImage ? (
        <img
          src={profile.profileImage}
          alt={t('profile.imageAlt')}
          className="w-24 sm:w-32 h-24 sm:h-32 rounded-full mx-auto mb-4 sm:mb-6 object-cover ring-4 ring-green-300/50 transform transition-all hover:scale-105 animate-bounceIn"
          onError={(e) => { e.target.src = '/placeholder.jpg'; }}
          aria-label={t('profile.imageAria')}
        />
      ) : (
        <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full mx-auto mb-4 sm:mb-6 bg-gradient-to-br from-gray-500/50 to-gray-700/50 flex items-center justify-center text-white text-sm sm:text-base animate-pulse">
          <span>{t('profile.noImage')}</span>
        </div>
      )}
      <div className="space-y-3 sm:space-y-4 text-center">
        <p className="text-sm sm:text-base text-yellow-200">
          <strong className="text-white">{t('profile.name')}:</strong> {profile?.name || t('profile.na')}
        </p>
        <p className="text-sm sm:text-base text-yellow-200">
          <strong className="text-white">{t('profile.email')}:</strong> {profile?.email || t('profile.na')}
        </p>
        <p className="text-sm sm:text-base text-yellow-200">
          <strong className="text-white">{t('profile.role')}:</strong> {profile?.role || t('profile.na')}
        </p>
        <p className="text-sm sm:text-base text-yellow-200">
          <strong className="text-white">{t('profile.location')}:</strong> {profile?.location || t('profile.na')}
        </p>
        <p className="text-sm sm:text-base text-yellow-200">
          <strong className="text-white">{t('profile.joined')}:</strong> {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : t('profile.na')}
        </p>
      </div>
    </div>
  );
};

export default ProfileSection;