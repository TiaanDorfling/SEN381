export class Resource {
  constructor(resourceId, type, title, filePath, uploadedBy) {
    this.resourceId = resourceId;
    this.type = type;
    this.title = title;
    this.filePath = filePath;
    this.uploadedBy = uploadedBy;
  }

  uploadResource() { /* logic */ }
  downloadResource() { /* logic */ }
}