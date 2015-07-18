<%@ page language="java" errorPage="/error.jsp" pageEncoding="GB2312" contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<c:set var="datePattern"><fmt:message key="date.format"/></c:set>
<%@ taglib prefix="self_def" uri="/WEB-INF/tlds/dictionaryTag.tld" %>