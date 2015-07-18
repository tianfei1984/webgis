package com.ltmonitor.web.util;


import javax.servlet.http.HttpServletResponse;

import java.io.*;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;

import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
/**
 * Excel工具类
 */
public class ExcelUtils {
    /**
     * 从Excel文件得到二维数组，每个sheet的第一行为标题
     * 
     * @param file Excel文件
     * @return
     * @throws FileNotFoundException
     * @throws IOException
     */
    public static String[][] getData(File file) throws FileNotFoundException,
            IOException {
        return getData(file, 1);
    }

    /**
     * 从Excel文件得到二维数组
     * 
     * @param file Excel文件
     * @param ignoreRows 忽略的行数，通常为每个sheet的标题行数
     * @return
     * @throws FileNotFoundException
     * @throws IOException
     */
    public static String[][] getData(File file, int ignoreRows)
            throws FileNotFoundException, IOException {
        ArrayList result = new ArrayList();
        int rowSize = 0;
        BufferedInputStream in = new BufferedInputStream(new FileInputStream(
                file));
        // 打开HSSFWorkbook
        POIFSFileSystem fs = new POIFSFileSystem(in);
        HSSFWorkbook wb = new HSSFWorkbook(fs);
        HSSFCell cell = null;
        for (int sheetIndex = 0; sheetIndex < wb.getNumberOfSheets(); sheetIndex++) {
            HSSFSheet st = wb.getSheetAt(sheetIndex);

            // 第一行为标题，不取
            for (int rowIndex = ignoreRows; rowIndex <= st.getLastRowNum(); rowIndex++) {
                HSSFRow row = st.getRow(rowIndex);
                if (row == null) {
                    continue;
                }
                int tempRowSize = row.getLastCellNum() + 1;
                if (tempRowSize > rowSize) {
                    rowSize = tempRowSize;
                }
                String[] values = new String[rowSize];
                Arrays.fill(values, "");
                boolean hasValue = false;
                for (short columnIndex = 0; columnIndex <= row.getLastCellNum(); columnIndex++) {
                    String value = "";
                    cell = row.getCell(columnIndex);
                    if (cell != null) {
                        // 注意：一定要设成这个，否则可能会出现乱码
                        //cell.setEncoding(HSSFCell.ENCODING_UTF_16);
                        switch (cell.getCellType()) {
                        case HSSFCell.CELL_TYPE_STRING:
                            value = cell.getStringCellValue();
                            break;
                        case HSSFCell.CELL_TYPE_NUMERIC:
                            if (HSSFDateUtil.isCellDateFormatted(cell)) {
                                Date date = cell.getDateCellValue();
                                if (date != null) {
                                    value = new SimpleDateFormat("yyyy-MM-dd")
                                            .format(date);
                                } else {
                                    value = "";
                                }
                            } else {
                                value = new DecimalFormat("0.####").format(cell
                                        .getNumericCellValue());
                            }
                            break;
                        case HSSFCell.CELL_TYPE_FORMULA:
                            // 导入时如果为公式生成的数据则无值
                            if (!cell.getStringCellValue().equals("")) {
                                value = cell.getStringCellValue();
                            } else {
                                value = cell.getNumericCellValue() + "";
                            }
                            break;
                        case HSSFCell.CELL_TYPE_BLANK:
                            break;
                        case HSSFCell.CELL_TYPE_ERROR:
                            value = "";
                            break;
                        case HSSFCell.CELL_TYPE_BOOLEAN:
                            value = (cell.getBooleanCellValue() == true ? "Y"
                                    : "N");
                            break;
                        default:
                            value = "";
                        }
                    }
                    if (columnIndex == 0 && value.trim().equals("")) {
                        break;
                    }
                    values[columnIndex] = value;//StringUtils.rightTrim(value);
                    hasValue = true;
                }

                if (hasValue) {
                    result.add(values);
                }
            }
        }
        in.close();
        String[][] returnArray = new String[result.size()][rowSize];
        for (int i = 0; i < returnArray.length; i++) {
            returnArray[i] = (String[]) result.get(i);
        }
        return returnArray;
    }
    
    /**
     * 根据contentType下载文件。
     * @param response 响应
     * @param File 要下载的文件源
     * @param contentType
     * @throws Exception
     */
    public static void downFile(HttpServletResponse response, File file, String contentType) throws Exception {
        java.io.BufferedInputStream bis = null;
        java.io.BufferedOutputStream bos = null;
        String destFileName = file.getPath();
        String shortFileName = file.getName();
        try{
            shortFileName = java.net.URLEncoder.encode(shortFileName,"UTF-8");
            response.setContentType(contentType);
            response.setHeader("Content-disposition", "attachment;filename=" + shortFileName);
            java.io.File filein = new java.io.File(destFileName); 
            //filein.get
            java.io.FileInputStream fileInputStream = new java.io.FileInputStream(filein);
            bis = new java.io.BufferedInputStream(fileInputStream);
            bos = new java.io.BufferedOutputStream(response.getOutputStream()); 
            byte[] buff = new byte[2048];
            int bytesRead;
            while(-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
                bos.write(buff,0,bytesRead);
            }
        }catch(Exception e ){
            e.printStackTrace();
            throw e;
        }finally{
            if (bis != null) bis.close();
            if (bos != null) bos.close();
        }
    }
    
    /**
     * 设置Cell的值
     * 
     * @param st
     * @param rowIndex 行坐标
     * @param columnIndex 列坐标
     * @param value 值
     */
    public static void setValue(HSSFSheet st, int rowIndex, int columnIndex,
            String value) {
        if (value == null) {
            value = "";
        }
        HSSFRow row = st.getRow(rowIndex);
        if (row == null) {
            row = st.createRow(rowIndex);
        }
        HSSFCell cell = row.getCell((short) columnIndex);
        if (cell == null) {
            cell = row.createCell((short) columnIndex);
        }
        //注意：一定要设成这个，否则可能会出现乱码
        //cell.set(HSSFCell.ENCODING_UTF_16);
        cell.setCellValue(value);
    }
}