import React, { useState } from 'react';
import { Button, Grid, Loading, Text } from '@nextui-org/react';
import axios from 'axios';

import { useAppSelector, useAppDispatch } from '@client/app/hooks';
import { getPaymentInfo, updatePaymentInfo } from '@client/features/payment/paymentSlice';

const Finished = () => {
  const [refundIsLoading, setRefundLoading] = useState(false);
  const paymentInfo = useAppSelector(getPaymentInfo);
  const dispatch = useAppDispatch();

  const handleRefund = async (e: any) => {
    e.preventDefault();
    if (!paymentInfo) {
      return;
    }
    setRefundLoading(true);
    const { subscriptionId } = paymentInfo;
    await axios
      .post('/api/subscription/cancel', { subscriptionId })
      .then((r) => {
        if (!r?.data?.apiData) {
          return;
        }
        console.log('cancelResult', r.data.apiData);
        dispatch(updatePaymentInfo({ status: 'refunded', displayApiData: r.data.apiData }));
      })
      .finally(() => {
        setRefundLoading(false);
      });
  };

  return (
    <Grid.Container gap={1} className="justify-center mt-5">
      {paymentInfo.status === 'finished' && (
        <div>
          <Grid>
            <Text h3 color="$purple500" className="font-bold">
              Subscribed successfully!
            </Text>
          </Grid>
          <Grid>
            <Button disabled={refundIsLoading} size="md" onClick={handleRefund}>
              {refundIsLoading ? (
                <Loading type="points" color="primary" size="sm" />
              ) : (
                'Cancel & Refund'
              )}
            </Button>
          </Grid>
        </div>
      )}

      {paymentInfo.status === 'refunded' && (
        <Grid>
          <Text color="$purple500" className="font-bold">
            Cancelled subscription and refunded invoice.
          </Text>
        </Grid>
      )}
    </Grid.Container>
  );
};

export default Finished;
