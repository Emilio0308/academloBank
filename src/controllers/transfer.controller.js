const transferModel = require('./../model/transfer.model');
const UserModel = require('./../model/user.model');
const catchAsync = require('./../utils/catchAsync');

exports.transfer = catchAsync(async (req, res , next) => {
  //obtenemos datos necesarios//
  const { senderAccount, receiverAccount, amountToTransfer } = req.body;
  //verificamos q exista la cuenta q envia//
  const senderUser = await UserModel.findOne({
    where: {
      accountNumber: senderAccount,
      status: 'active',
    },
  });
  //verificamos la cuenta que recibe//
  const receiverUser = await UserModel.findOne({
    where: {
      accountNumber: receiverAccount,
      status: 'active',
    },
  });
  //si no existe alguna devolvemos un error//
  if (!(senderUser && receiverUser)) {
    return res.status(400).json({
      message: 'account does not exist',
      status: 'error',
    });
  }
  //verificamos que la cuenta que transfiere tenga suficiente dinero//
  if (senderUser.amount < amountToTransfer) {
    return res.status(400).json({
      message: 'Not enough Money',
      status: 'error',
    });
  }
  //calculamos los nuevos montos para cada usuario//
  const newSenderAmount = senderUser.amount - amountToTransfer;
  const newReceiverAmount = receiverUser.amount + amountToTransfer;
  //actualizamos montos//
  await senderUser.update({ amount: newSenderAmount });
  await receiverUser.update({ amount: newReceiverAmount });
  //creamos trasferencia//
  const transfer = await transferModel.create({
    amount: amountToTransfer,
    senderUserId: senderUser.id,
    receiverUserId: receiverUser.id,
  });

  return res.status(200).json({
    message: `succes transfer of ${amountToTransfer} from ${senderUser.name} to ${receiverUser.name}`,
    transfer,
  });
});
