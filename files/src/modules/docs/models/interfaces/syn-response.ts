export interface SynResponse {
  error?: any;
  data: { [key in SynKeys]: Datum };
  success: boolean;
}

export interface Datum {
  maxVersion: number;
  minVersion: number;
  path: Path;
  requestFormat?: RequestFormat;
}

export enum Path {
  AuthCGI = 'auth.cgi',
  EntryCGI = 'entry.cgi',
}

export enum RequestFormat {
  JSON = 'JSON',
}

export enum SynKeys {
  SYNOAPIAuth = 'SYNO.API.Auth',
  SYNOFileStationBackgroundTask = 'SYNO.FileStation.BackgroundTask ',
  SYNOFileStationCheckExist = 'SYNO.FileStation.CheckExist',
  SYNOFileStationCheckPermission = 'SYNO.FileStation.CheckPermission',
  SYNOFileStationCompress = 'SYNO.FileStation.Compress',
  SYNOFileStationCopyMove = 'SYNO.FileStation.CopyMove',
  SYNOFileStationCreateFolder = 'SYNO.FileStation.CreateFolder',
  SYNOFileStationDelete = 'SYNO.FileStation.Delete',
  SYNOFileStationDirSize = 'SYNO.FileStation.DirSize',
  SYNOFileStationDownload = 'SYNO.FileStation.Download',
  SYNOFileStationExternalGoogleDrive = 'SYNO.FileStation.External.GoogleDrive',
  SYNOFileStationExtract = 'SYNO.FileStation.Extract',
  SYNOFileStationFavorite = 'SYNO.FileStation.Favorite',
  SYNOFileStationFormUpload = 'SYNO.FileStation.FormUpload',
  SYNOFileStationInfo = 'SYNO.FileStation.Info',
  SYNOFileStationList = 'SYNO.FileStation.List',
  SYNOFileStationMD5 = 'SYNO.FileStation.MD5',
  SYNOFileStationMount = 'SYNO.FileStation.Mount',
  SYNOFileStationMountList = 'SYNO.FileStation.Mount.List',
  SYNOFileStationNotify = 'SYNO.FileStation.Notify',
  SYNOFileStationProperty = 'SYNO.FileStation.Property',
  SYNOFileStationPropertyACLOwner = 'SYNO.FileStation.Property.ACLOwner',
  SYNOFileStationPropertyCompressSize = 'SYNO.FileStation.Property.CompressSize',
  SYNOFileStationPropertyMtime = 'SYNO.FileStation.Property.Mtime',
  SYNOFileStationRename = 'SYNO.FileStation.Rename',
  SYNOFileStationSearch = 'SYNO.FileStation.Search',
  SYNOFileStationSearchHistory = 'SYNO.FileStation.Search.History',
  SYNOFileStationSettings = 'SYNO.FileStation.Settings',
  SYNOFileStationSharing = 'SYNO.FileStation.Sharing',
  SYNOFileStationSharingDownload = 'SYNO.FileStation.Sharing.Download',
  SYNOFileStationSnapshot = 'SYNO.FileStation.Snapshot',
  SYNOFileStationThumb = 'SYNO.FileStation.Thumb',
  SYNOFileStationTimeout = 'SYNO.FileStation.Timeout',
  SYNOFileStationUIString = 'SYNO.FileStation.UIString',
  SYNOFileStationUpload = 'SYNO.FileStation.Upload',
  SYNOFileStationUserGrp = 'SYNO.FileStation.UserGrp',
  SYNOFileStationVFSConnection = 'SYNO.FileStation.VFS.Connection',
  SYNOFileStationVFSFile = 'SYNO.FileStation.VFS.File',
  SYNOFileStationVFSGDrive = 'SYNO.FileStation.VFS.GDrive',
  SYNOFileStationVFSProfile = 'SYNO.FileStation.VFS.Profile',
  SYNOFileStationVFSProtocol = 'SYNO.FileStation.VFS.Protocol',
  SYNOFileStationVFSUser = 'SYNO.FileStation.VFS.User',
  SYNOFileStationVirtualFolder = 'SYNO.FileStation.VirtualFolder',
}
