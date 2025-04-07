# niivue-layer-alignment

This is the demo to show layer alignment.

`chris_t1.nii.gz` is from [niivue-demo-images](https://github.com/niivue/niivue-demo-images/blob/main/chris_t1.nii.gz).

The partial image is constructed using the following code snippet:

```python
import SimpleSTK as sitk

filename = 'chris_t1.nii.gz'
img_sitk = sitk.ReadImage(filename)

img_npy = sitk.GetArrayFromImage(img_sitk)
img_npy_crop_offset = [slice(20, 130), slice(43, 173), slice(14, 134)]
img_sitk2 = sitk.GetImageFromArray(img_npy_crop)

spacing = img_sitk.GetSpacing()
origin2 = (origin[0] - 14 * spacing[0], origin[1] - 43 * spacing[1], origin[2] + 20 * spacing[2])
img_sitk2.SetOrigin(origin2)
img_sitk2.SetDirection(img_sitk.GetDirection())
img_sitk2.SetSpacing(img_sitk.GetSpacing())

filename2 = 'chris_t1-2.nii.gz'
writer = sitk.ImageFileWriter()
writer.SetFileName(filename2)
writer.Execute(img_sitk2)
```
