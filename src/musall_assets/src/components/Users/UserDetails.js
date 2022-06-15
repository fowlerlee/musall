// @mui
import { Typography, Grid, Card, Stack, Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import * as Yup from 'yup';
import { useCallback, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// hooks
// import useAuth from '../../../../hooks/useAuth';
// utils
import { fData } from '../../../utils/formatNumber';

// components
import { FormProvider, FSwitch, FSelect, FInputText, FUploadAvatar } from '../../../components/forms';
import countries from '../../../_mock/countries';
import UserService from "../../../../services/UserService";
import CardHeader from '../../../components/CardHeader';

// ICP file upload
import { ICPFileUpload } from '../../../components/fileupload/ICPFileUpload';


// ----------------------------------------------------------------------

export default function UserDetails({ novaOne, user, setUser }) {
  const resolverUserSchema = Yup.object().shape({
    userName: Yup.string().required('Name is required'),
  });

  const defaultValues = {
    userId: user?.user_id.toString() || '',
    userName: user?.info[0].name || '',
    email: user?.info[0].email || '',
    photoURL: UserService.getUserAvatarUrl(user),
    phoneNumber: user?.phoneNumber || '',
    country: user?.country || '',
    address: user?.address || '',
    state: user?.state || '',
    city: user?.city || '',
    zipCode: user?.zipCode || '',
    description: user?.info[0].description || '',
    isSeller: UserService.isSeller(user) || false,
    isPlayer: UserService.isPlayer(user) || false,
  };

  const methods = useForm({ defaultValues: defaultValues, resolver: yupResolver(resolverUserSchema) });
  const { handleSubmit, setValue, getValues, formState: { isSubmitting, isDirty, dirtyFields } } = methods;

  const onSubmit = async () => {
    const values = getValues();
    if (isDirty) {
      const userNameKey = "userName";
      const emailKey = "email";
      const descKey = "description";

      if (dirtyFields[userNameKey]) {
        onUserInfoChange('name', values[userNameKey]);
      }
      if (dirtyFields[emailKey]) {
        onUserInfoChange('email', values[emailKey]);
      }
      if (dirtyFields[descKey]) {
        onUserInfoChange('description', values[descKey]);
      }

      try {
        await new Promise((resolve) => {
          const isSellerKey = "isSeller";
          if (dirtyFields[isSellerKey]) {
            setSellerState(values[isSellerKey]);
          }
          const isPlayerKey = "isPlayer";
          if (dirtyFields[isPlayerKey]) {
            setPlayerState(values[isPlayerKey]);
          }
          updateUserInfo();
          setTimeout(resolve, 500);
        });
        // enqueueSnackbar('Update success!');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const [uploadingPhoto, setUploading] = useState(false);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setUploading(true);
        // Set value here to display the photo instanly
        setValue(
          'photoURL',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        ICPFileUpload(file).then((fileUrl) => {
          onUserInfoChange('avatar_url', fileUrl.toString());
          updateUserInfo();
          setUploading(false);
        });
      }
    },
    [setValue]
  );

  async function updateUserInfo() {
    console.log(updateUserInfo);
    const info = await UserService.updateUserInfo(novaOne, user.info[0]);
    const updatedUser = {
      ...user,
      info: [info]
    };
    setUser(updatedUser);
  }

  async function setSellerState(isSeller) {
    if (isSeller === UserService.isSeller(user)) {
      console.log("same state seller ignore");
      return;
    }
    console.log("updating seller " + isSeller);
    if (isSeller) {
      // TODO the creation of a shop has to be done in rust, to give an id
      const shop = {
        id: "1",
        city: "",
        name: "Your shop",
        catalogue: [],
        address: "",
        services: [],
      };
      user.seller_info[0] = {
        verified: true,
        shops: [],
        invitations_sent: [],
      };
      user.seller_info[0].shops[0] = shop;

    } else {
      user.seller_info = [];
    }
    const updatedSeller = await UserService.updateSellerInfo(novaOne, user.seller_info[0]);
  }

  async function setPlayerState(isPlayer) {
    if (isPlayer === UserService.isPlayer(user)) {
      console.log("same state player ignore");
      return;
    }
    console.log("updating player " + isPlayer);
    if (isPlayer) {
      user.player_info[0] = {
        education: [],
        level: "5",
        rewards: [],
        activity: [],
      };
    } else {
      user.player_info = [];
    }
    const updatedPlayer = await UserService.updatePlayerInfo(novaOne, user.player_info[0]);
  }


  // On-Change methods
  function onUserInfoChange(fieldName, fieldValue) {
    (user.info[0])[fieldName] = fieldValue;
  }
  function onPlayerInfoChange(fieldName, fieldValue) {
    (user.player_info[0])[fieldName] = fieldValue;
  }
  function onSellerInfoChange(fieldName, fieldValue) {
    (user.seller_info[0])[fieldName] = fieldValue;
  }


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      < Grid container spacing={3} >
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <FUploadAvatar
                name="photoURL"
                accept="image/*"
                maxSize={2145728}
                onDrop={handleDrop}
                uploading={uploadingPhoto}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary',
                    }}
                  >
                    Allowed *.png
                    <br /> max size of {fData(2145728)}
                  </Typography>
                }
              />
            </Box>

            <FSwitch
              name="isSeller"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Are your a seller?
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Enabling this will allow you to offer services in MusicNova
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />
            <Box sx={{ mb: 3 }}></Box>

            <FSwitch
              name="isPlayer"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Are your a player?
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Enabling this will allow you to benefit from MusicNova rewward system and unleash your true musician
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <CardHeader title="Profile settings" />

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <FInputText name="userId" label="User Id" disabled />
              <Stack />
            </Stack>

            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <FInputText name="userName" label="Name" required={true} />
              <FInputText name="email" label="Email Address" />

              <FInputText name="phoneNumber" label="Phone Number" />
              <FInputText name="address" label="Address" />

              <FSelect name="country" label="Country" placeholder="Country">
                <option value="" />
                {countries.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </FSelect>

              <FInputText name="state" label="State/Region" />

              <FInputText name="city" label="City" />
              <FInputText name="zipCode" label="Zip/Code" />
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <FInputText name="description" multiline rows={4} label="Description" />
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid >
    </FormProvider >
  );
}
